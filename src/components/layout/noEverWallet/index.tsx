import Button from '../../../components/core/button';
import { useCallback } from 'react';

const NoEverWallet = ({ onClose }: { onClose: () => void }) => {
  const onGetEverWalletClick = useCallback(() => {
    window.open('https://l1.broxus.com/everscale/wallet', '_blank');
    onClose();
  }, [onClose]);

  return (
    <div className='flex flex-col'>
      <div className='text-base'>Please install EVER Wallet</div>
      <div className='text-secondary-1 text-sm mt-3'>
        You might need to download it in order to get the full experience.
      </div>
      <div className='flex justify-between mt-6'>
        <Button variant='secondary' onClick={onClose}>
          <span>Cancel</span>
        </Button>

        <Button variant='primary' onClick={onGetEverWalletClick}>
          <span>Get EVER wallet</span>
        </Button>
      </div>
    </div>
  );
};

export default NoEverWallet;
