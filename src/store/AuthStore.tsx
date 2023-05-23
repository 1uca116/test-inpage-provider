import moment from 'moment';
import jwt_decode from 'jwt-decode';
import { Api } from '../api';
import { makeAutoObservable, runInAction } from 'mobx';
import { LayoutStore } from './LayoutStore';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { Buffer as BufferBrowser } from 'buffer';

type TokenData = {
  value: string;
  exp: number;
};

type EverAccount = {
  address: string;
  publicKey: string;
  walletType: string;
};

const jwtExpirationSlippageSec = 5;
const jwtStorageKey = 'snipa.finance_token';

const getLoginMsg = (address: string, timestamp: number) =>
  `I want to login at snipa.finance with address ${address} at ${timestamp}`;

export class AuthStore {
  constructor(private api: Api<unknown>, private layoutStore: LayoutStore) {
    makeAutoObservable(this);

    this.everProvider = new ProviderRpcClient();
  }

  initialized: boolean = false;
  extensionInstalled: boolean = false;
  account?: EverAccount;

  private everProvider: ProviderRpcClient;
  private jwtToken?: TokenData;

  get loggedIn() {
    return !!this.jwtToken && !!this.account;
  }

  async init() {
    try {
      await this.everProvider.ensureInitialized();
      await this.updateAccountState();

      const token = localStorage.getItem(jwtStorageKey);

      this.setJwtToken(token);

      runInAction(() => {
        this.extensionInstalled = true;
        this.initialized = true;
      });
    } catch {
      runInAction(() => {
        this.extensionInstalled = false;
        this.initialized = true;
      });
    }
  }

  async login() {
    if (!this.extensionInstalled) {
      this.layoutStore.showEverWalletModal();
      return;
    }

    try {
      await this.everProvider.requestPermissions({
        permissions: ['basic', 'accountInteraction'],
      });

      await this.updateAccountState();

      if (!this.account) {
        return;
      }

      const timestamp = moment().unix();
      const msg = getLoginMsg(this.account.address, timestamp);
      const signedMsg = await this.signMessage(msg);

      const result = await this.api.auth.loginCreate({
        ...this.account,
        timestamp: timestamp,
        signature: signedMsg?.signature ?? '',
      });

      this.setJwtToken(result.data);
    } catch {
      await this.logout();
    }
  }

  async logout() {
    await this.everProvider.disconnect();
    await this.updateAccountState();

    this.clearJwtToken();
  }

  private setJwtToken(token: string | null | undefined) {
    if (!token || !this.account) {
      return;
    }

    const decodedToken = jwt_decode<{ exp: number }>(token);

    if (this.jwtTokenExpired(decodedToken.exp)) {
      return;
    }

    localStorage.setItem(jwtStorageKey, token);

    runInAction(() => {
      this.jwtToken = {
        value: token,
        exp: decodedToken.exp,
      };
      this.refreshHttpInterceptors();
    });
  }

  private clearJwtToken() {
    localStorage.removeItem(jwtStorageKey);

    runInAction(() => {
      this.jwtToken = undefined;
      this.refreshHttpInterceptors();
    });
  }

  private jwtTokenExpired(exp: number) {
    return moment().unix() >= exp - jwtExpirationSlippageSec;
  }

  private async signMessage(message: string) {
    if (!this.account) {
      return null;
    }

    const base64Msg = BufferBrowser.from(message, 'utf-8').toString('base64');
    const publicKey = this.account.publicKey;

    const result = await this.everProvider.signData({
      data: base64Msg,
      publicKey: publicKey,
    });

    return result;
  }

  private async updateAccountState() {
    const state = await this.everProvider.getProviderState();

    runInAction(() => {
      const accountInteraction = state.permissions.accountInteraction;

      if (!accountInteraction) {
        this.account = undefined;
        return;
      }

      this.account = {
        address: accountInteraction.address?.toString(),
        publicKey: accountInteraction.publicKey,
        walletType: accountInteraction.contractType,
      };
    });
  }

  private requestInterceptorId = 0;
  private responseInterceptorId = 0;

  private refreshHttpInterceptors() {
    this.api.instance.interceptors.request.eject(this.requestInterceptorId);
    this.api.instance.interceptors.response.eject(this.responseInterceptorId);

    const token = this.jwtToken;

    if (!token) {
      return;
    }

    this.requestInterceptorId = this.api.instance.interceptors.request.use(
      async (cfg) => {
        if (this.jwtTokenExpired(token.exp)) {
          this.clearJwtToken();
          return cfg;
        }

        if (cfg.headers) {
          cfg.headers['Authorization'] = `Bearer ${token.value}`;
        }

        return cfg;
      },
      (err) => Promise.reject(err)
    );

    this.responseInterceptorId = this.api.instance.interceptors.response.use(
      (cfg) => cfg,
      async (err) => {
        if (err.response?.status === 401 && this.loggedIn) {
          this.clearJwtToken();
        }

        return Promise.reject(err);
      }
    );
  }
}
