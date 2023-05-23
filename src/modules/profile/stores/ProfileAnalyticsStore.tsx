import { Api } from '../../../api';
import { MultiSelectValue } from '../../../components/core/select/multi-select';
import { groupBy, map } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import { AnalyticsTokenModel } from '../../../models/AnalyticsTokenModel';
import { StaticDataStore } from '../../../store/StaticDataStore';
import { ImpermanentLossModel } from '../../../models/ImpermanentLossModel';

export class ProfileAnalyticsStore {
  constructor(private api: Api<unknown>, private staticData: StaticDataStore) {
    makeAutoObservable(this);
  }

  private address?: string;

  loading = false;
  data?: AnalyticsTokenModel[];
  iplData?: ImpermanentLossModel[];

  selectedProjects: MultiSelectValue[] = this.projects;

  get projects(): MultiSelectValue[] {
    return [
      {
        label: 'Wallet',
        value: 'wallet',
        icon: this.staticData.getProjectLogo('wallet'),
      },
      ...this.staticData.allProjects.map((x) => ({
        label: x.name,
        value: x.id,
        icon: this.staticData.getProjectLogo(x.id),
      })),
    ];
  }

  async init(address: string) {
    if (address === this.address) {
      return;
    }

    runInAction(() => {
      this.address = address;
      this.data = undefined;
      this.iplData = undefined;
    });

    this.refresh();
  }

  async refresh() {
    this.fetch();
  }

  async applyFilter(projects: MultiSelectValue[]) {
    runInAction(() => {
      this.selectedProjects = projects;
    });

    this.fetch();
  }

  private async fetch() {
    if (!this.address) {
      return;
    }

    try {
      runInAction(() => {
        this.loading = true;
      });

      const tokens = await this.fetchProjects(
        this.selectedProjects.map((x) => x.value)
      );

      const ipl = await this.getIpl();

      const tokenGroups = groupBy(
        tokens.flatMap((x) => x),
        (x) => x.timestamp
      );

      const combinedTokens = map(tokenGroups, (models) =>
        models.reduce((x, y) => x.combine(y))
      );

      runInAction(() => {
        this.data = combinedTokens;
        this.iplData = ipl;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  private async fetchProjects(projects?: string[]) {
    const result = await this.api.history.accountHistoryCreate({
      accounts: this.address ? [this.address] : [],
      projects: projects ?? null,
      timeSecBefore: null,
      timeSecFrom: null,
    });

    const tokens = result.data.items.map((x) => new AnalyticsTokenModel(x));

    return tokens;
  }

  private async getIpl() {
    const result = await this.api.history.impermanentLossCreate({
      account: this.address ? this.address : '',
      timeSecBefore: null,
      timeSecFrom: null,
    });

    const iplValues = result.data.ipls
      .map((x) => new ImpermanentLossModel(x))
      .sort((x, y) => {
        if (x.timestamp > y.timestamp) return 1;
        else return -1;
      });

    return iplValues;
  }
}
