import './index.css';
import WalletList from './wallet-list';
import { WalletModel } from '../../../models/WalletModel';

const Wallet = ({ data }: { data?: WalletModel }) => {
  if (!data || data.tokens.length === 0) {
    return null;
  }

  return (
    <div className='wallet_main'>
      WALLET
      <WalletList assets={data.tokens} />
    </div>
  );
};

export default Wallet;
