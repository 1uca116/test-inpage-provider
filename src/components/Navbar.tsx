import {useCallback} from "react";
import {useAuthStore} from "../provider/AuthProvider";
import {observer} from "mobx-react-lite";

const Navbar = observer(() => {
        const auth = useAuthStore();

        const onEverLoginClick = useCallback(() => {
            auth.login();
        }, [auth]);

        const onEverLogoutClick = useCallback(() => {
            auth.logout();
        }, [auth]);

        return (
            <div>
                {auth.loggedIn && auth.account?.address ? (
                    <>
                        <button
                            className='btn_primary px-5 py-2 disabled:opacity-60 '
                            onClick={onEverLogoutClick}
                        >
                            <span className='md:hidden'>Log out</span>
                        </button>

                        <p className='py-2'>{auth.account.address}</p>
                    </>
                ) : (
                    <>
                        <button
                            className='btn_primary px-5 py-2 disabled:opacity-60 '
                            onClick={onEverLoginClick}
                        >
                            <span className='md:hidden'>Login</span>
                        </button>
                        <p className='py-2'>not logged in</p>
                    </>
                )}
            </div>
        )
    }
)

export default Navbar
