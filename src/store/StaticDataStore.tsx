import axios from 'axios';

import { Api, NetworkDTO, ProjectDTO } from '../api';
import { makeAutoObservable, runInAction } from 'mobx';

import placeholder from '../assets/tokens/placeholder.svg';
import ever from '../assets/tokens/ever.svg';

import everStart from '../assets/projects/everstart.svg';
import dexada from '../assets/projects/dexada.svg';
import blackInk from '../assets/projects/black-ink.svg';
import boostedStaking from '../assets/projects/boosted-staking.png';

import everscale from '../assets/networks/everscale.svg';

import exchangePlaceholder from '../assets/exchanges/placeholder.svg';
import huobi from '../assets/exchanges/huobi.svg';
import gateio from '../assets/exchanges/gateio.svg';
import mexc from '../assets/exchanges/mexc.svg';
import kucoin from '../assets/exchanges/kucoin.svg';

import WalletLogo from '../assets/images/wallet.png';

export type networkType = 'network' | 'exchange';

const tokenManifestSources = [
  'https://raw.githubusercontent.com/snipa-sniper/snipa-assets/main/tokens/exchange/manifest.json',
  'https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json',
  'https://raw.githubusercontent.com/broxus/flatqube-assets/master/manifest.json',
  'https://raw.githubusercontent.com/tonred/dex-assets/main/manifest.json',
];

const projectLogoMap = new Map([
  ['dexada', dexada],
  ['everstart', everStart],
  ['black-ink', blackInk],
  ['boosted-staking', boostedStaking],
]);

const networkLogoMap = new Map([['everscale', everscale]]);

const exchangeLogoMap = new Map([
  ['huobi', huobi],
  ['gateio', gateio],
  ['mexc', mexc],
  ['kucoin', kucoin],
]);

const tokenAddressToLogoMap = new Map<string, string>();
const tokenSymbolToLogoMap = new Map<string, string>();

export class StaticDataStore {
  constructor(private api: Api<unknown>) {
    makeAutoObservable(this);
  }

  initialized = false;

  private networks: NetworkDTO[] = [];
  private projectsToNetworkMap = new Map<string, ProjectDTO[]>();

  async init() {
    try {
      await Promise.all([this.fetchTokenData(), this.fetchNetworkData()]);
    } catch (err) {
      console.error(err);
    } finally {
      runInAction(() => {
        this.initialized = true;
      });
    }
  }

  getNetworks(): NetworkDTO[] {
    return this.networks;
  }

  getNetworkLogo(id: string, type: networkType = 'network') {
    if (type === 'network') {
      return networkLogoMap.get(id);
    }

    if (type === 'exchange') {
      return exchangeLogoMap.get(id) ?? exchangePlaceholder;
    }
  }

  getProject(projectId: string): ProjectDTO | undefined {
    return this.allProjects.find((x) => x.id === projectId);
  }

  getProjects(networkId: string): ProjectDTO[] {
    return this.projectsToNetworkMap.get(networkId) ?? [];
  }

  getProjectLogo(projectId: string) {
    if (projectId === 'wallet') {
      return WalletLogo;
    }

    return projectLogoMap.get(projectId) ?? everscale;
  }

  getTokenLogo(rootAddress: string, isNative: boolean) {
    if (isNative) {
      return ever;
    }

    return tokenAddressToLogoMap.get(rootAddress) ?? placeholder;
  }

  getExchangeTokenLogo(symbol: string) {
    return tokenSymbolToLogoMap.get(symbol) ?? placeholder;
  }

  get allProjects() {
    const networks = this.getNetworks();

    const projects = networks
      .map((network) => this.getProjects(network.id))
      .flatMap((x) => x);

    return projects;
  }

  private async fetchNetworkData() {
    const networks = await this.api.networks.networkListList();

    runInAction(() => {
      this.networks = networks.data;
    });

    await Promise.all(
      networks.data.map((network) => this.fetchProjectsData(network.id))
    );
  }

  private async fetchProjectsData(networkId: string) {
    const projects = await this.api.projects.projectsCreate({ id: networkId });

    runInAction(() => {
      this.projectsToNetworkMap.set(networkId, projects.data);
    });
  }

  private async fetchTokenData() {
    try {
      const result = await Promise.all(
        tokenManifestSources.map((url) => axios.get(url))
      );

      const tokens = result.flatMap((x) => x.data.tokens);

      tokens.forEach((token) => {
        if (token.address) {
          tokenAddressToLogoMap.set(token.address, token.logoURI);
        }

        if (token.symbol) {
          tokenSymbolToLogoMap.set(token.symbol, token.logoURI);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}
