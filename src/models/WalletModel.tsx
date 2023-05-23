import { TokenBalanceModel, TokenBalanceProps } from './TokenBalanceModel';
import BigNumber from 'bignumber.js';
import { groupBy, map } from 'lodash';

type WalletProps = {
  tokenBalances: TokenBalanceProps[];
};

export class WalletModel {
  tokens: TokenBalanceModel[];
  totalUsdValue: BigNumber;

  constructor(props?: WalletProps) {
    this.tokens =
      props?.tokenBalances.map((x) => new TokenBalanceModel(x)) ?? [];
    this.totalUsdValue = this.tokens
      .map((x) => x.total)
      .reduce((x, y) => x.plus(y), new BigNumber(0));
  }

  combine(wallet: WalletModel) {
    const result = new WalletModel();

    const tokenGroups = groupBy(this.tokens.concat(wallet.tokens), (x) => [
      x.rootAddress,
      x.symbol,
      x.network,
    ]);

    result.tokens = map(tokenGroups, (tokens) =>
      tokens.reduce((x, y) => x.combine(y))
    );

    result.totalUsdValue = result.tokens
      .map((x) => x.total)
      .reduce((x, y) => x.plus(y), new BigNumber(0));

    return result;
  }
}
