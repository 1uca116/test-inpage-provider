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
            <div className='py-4'>
                {auth.loggedIn && auth.account?.address ? (
                    <>
                        <button
                            className='px-5 rounded-md border border-slate-200 bg-rose-400 text-white'
                            onClick={onEverLogoutClick}
                            type={'button'}
                        >
                            Log out
                        </button>

                        <p className='py-2'>{auth.account.address}</p>
                    </>
                ) : (
                    <>
                        <button
                            className='px-5 rounded-md border border-slate-200 bg-blue-400 text-white '
                            onClick={onEverLoginClick}
                            type={'button'}
                        >
                            Login
                        </button>
                        <p className='py-2'>not logged in</p>
                    </>
                )}
            </div>
        )
    }
)

export default Navbar
