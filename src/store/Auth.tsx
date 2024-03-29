import { makeAutoObservable, runInAction } from 'mobx';
import { LayoutStore } from './LayoutStore';
import { ProviderRpcClient } from 'everscale-inpage-provider';


type EverAccount = {
  address: string;
  publicKey: string;
  walletType: string;
};

export class AuthStore {
  constructor(private layoutStore: LayoutStore) {
    makeAutoObservable(this);

    this.everProvider = new ProviderRpcClient();
  }

  initialized: boolean = false;
  extensionInstalled: boolean = false;
  account?: EverAccount;

  private everProvider: ProviderRpcClient;

  get loggedIn() {
    return !!this.account;
  }

  async init() {
    try {
      await this.everProvider.ensureInitialized();
      await this.updateAccountState();

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
    } catch {
      await this.logout();
    }
  }

  async logout() {
    await this.everProvider.disconnect();
    await this.updateAccountState();
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
}
