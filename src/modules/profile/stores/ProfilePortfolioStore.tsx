import { Api, NetworkDTO, ProjectDTO } from '../../../api';
import BigNumber from 'bignumber.js';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { NetworkModel } from '../../../models/NetworkModel';
import { ProjectModel } from '../../../models/ProjectModel';
import { WalletModel } from '../../../models/WalletModel';
import { StaticDataStore } from '../../../store/StaticDataStore';

export class ProfilePortfolioStore {
  constructor(private api: Api<unknown>, private staticData: StaticDataStore) {
    makeAutoObservable(this);

    reaction(
      () => this.networks,
      () => {
        this.totalPortfolioUsdValue =
          this.networks
            ?.map((x) => x.totalUsdValue)
            .reduce((x, y) => x.plus(y), new BigNumber(0)) ?? new BigNumber(0);
      }
    );
  }

  loading: boolean = false;
  address?: string;
  networks?: NetworkModel[];
  totalPortfolioUsdValue = new BigNumber(0);

  async fetchPortfolio(address: string) {
    runInAction(() => {
      this.loading = true;

      if (this.address === address) {
        return;
      }

      this.address = address;
      this.networks = undefined;
      this.totalPortfolioUsdValue = new BigNumber(0);
    });

    try {
      const networkList = this.staticData.getNetworks();

      const networks = await Promise.all(
        networkList.map((network) => this.getNetworkModel(network, address))
      );

      runInAction(() => {
        this.networks = networks;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  private async getNetworkModel(network: NetworkDTO, address: string) {
    const projectsList = this.staticData.getProjects(network.id);

    const walletPromise = this.getWalletData(network, address);
    const projectsPromise = Promise.all(
      projectsList.map((project) => this.getProjectModel(project, address))
    );

    const result = await Promise.all([walletPromise, projectsPromise]);

    const wallet = result[0];
    const projects = result[1];

    return new NetworkModel(network, wallet, projects);
  }

  private async getWalletData(network: NetworkDTO, address: string) {
    try {
      const result = await this.api.account.walletAssetsCreate({
        address: address,
        networkId: network.id,
      });

      return new WalletModel(result.data);
    } catch {
      return new WalletModel({ tokenBalances: [] });
    }
  }

  private async getProjectModel(project: ProjectDTO, address: string) {
    try {
      const result = await this.api.account.accountDataCreate({
        account: address,
        projectType: project.id,
      });

      return new ProjectModel(project, result.data);
    } catch {
      return new ProjectModel(project, {
        address: address,
        pools: [],
      });
    }
  }
}
