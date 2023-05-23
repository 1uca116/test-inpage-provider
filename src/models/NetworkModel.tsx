import BigNumber from 'bignumber.js';
import { networkType } from '../store/StaticDataStore';
import { ProjectModel } from './ProjectModel';
import { WalletModel } from './WalletModel';

type NetworkProps = { id: string; name: string; link: string };

export class NetworkModel {
  id: string;
  name: string;
  wallet: WalletModel;
  projects: ProjectModel[];
  link: string;
  totalUsdValue: BigNumber;
  type: networkType;

  constructor(
    props: NetworkProps,
    wallet: WalletModel,
    projects: ProjectModel[],
    type?: networkType
  ) {
    this.id = props.id;
    this.name = props.name;
    this.link = props.link;
    this.wallet = wallet;
    this.projects = projects;

    this.type = type ?? 'network';

    this.totalUsdValue = projects
      .map((x) => x.totalUsdValue)
      .reduce((x, y) => x.plus(y), new BigNumber(0))
      .plus(wallet.totalUsdValue);
  }
}
