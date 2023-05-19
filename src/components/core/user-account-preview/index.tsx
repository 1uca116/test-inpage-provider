import './index.css';
import testPicture from '../../../assets/images/unnamed.jpg';
import { cutString } from '../../../utils/strings';

type Props = {
  address: string;
};

const UserAccountPreview = ({ address }: Props) => {
  return (
    <div className='acc_preview-main'>
      <img src={testPicture} className='acc_preview-avatar' alt='picture' />
      <div className='acc_preview-info'>
          <div className='acc_preview-name'>Wallet's name</div>
        <div className='acc_preview-address'>{cutString(address, 6, 4)}</div>
      </div>
    </div>
  );
};
export default UserAccountPreview;
