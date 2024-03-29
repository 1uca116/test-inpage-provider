import './index.css';
import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../../provider/AuthProvider';
import Button from '../../core/button';
import { FaWallet } from 'react-icons/fa';
import UserAccountPreview from '../../core/user-account-preview';
import { GiHamburgerMenu } from 'react-icons/gi';
import ROUTES from '../../../routes/routes';
import { Link } from 'react-router-dom';

const Navbar = observer(() => {
  const auth = useAuthStore();

  const links = useMemo(
    () => [
      {
        url: `/${ROUTES.nft.path}`,
        text: 'Explore NFT',
      },
      {
        url: `/${ROUTES.stats.path}`,
        text: 'Statistics',
      },
      {
        url: `/${ROUTES.bundles.path}`,
        text: 'Bundles',
      },
    ],
    []
  );
  const onEverLoginClick = useCallback(() => {
    auth.login();
  }, [auth]);

  const onEverLogoutClick = useCallback(() => {
    auth.logout();
  }, [auth]);

  return (
    <div className='navbar_body'>
      {auth.loggedIn && auth.account?.address ? (
        <div className='navbar_main'>
          <Link
            to={`${ROUTES.profile.path}/${auth.account.address}`}
            key={`${ROUTES.profile.path}`}
          >
            <FaWallet className='navbar_logo navbar_links-item' />
          </Link>
          <div className='navbar_links'>
            {links.map((link) => (
              <Link key={link.url} to={link.url} className='navbar_links-item'>
                {link.text}
              </Link>
            ))}

            <Button variant='secondary' onClick={onEverLogoutClick}>
              <span>Log out</span>
            </Button>
          </div>
          <div className='flex-none flex items-center gap-2'>
            <UserAccountPreview address={auth.account.address} />
            <GiHamburgerMenu className='text-3xl block sm:hidden' />
          </div>
        </div>
      ) : (
        <>
          <Button variant='primary' onClick={onEverLoginClick}>
            <span>Log in</span>
          </Button>
        </>
      )}
    </div>
  );
});

export default Navbar;
