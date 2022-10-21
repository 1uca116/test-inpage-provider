import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {useAuthStore} from "../../provider/AuthProvider";
import {useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import Wallet from "./Wallet";
import {usdt, wever} from "../../utils/tokens";

const Account = observer(() => {
        const auth = useAuthStore();
        const ever = useMemo(() => new ProviderRpcClient(), []);

        const [balance, setBalance] = useState('null');

        async function getWalletBalance() {
            if (auth.account) {
                const address = new Address(auth.account.address);
                let state = await ever.getFullContractState({address: address});
                if (state.state) {
                    setBalance((state.state.balance));
                }
                return "0";
            }
        }

        getWalletBalance().catch(console.error);

        return (
            <>
                {auth.loggedIn && auth.account?.address ? (
                    <>
                        <ul className="space-x-2 flex text-md text-white whitespace-nowrap font-medium">
                            <li className="bg-blue-400 group w-full flex flex-col items-center justify-center rounded-md border-2 p-3">
                                <div>Balance:
                                    <span className='font-bold'> {Number(balance) / 1000000000} EVER</span>
                                </div>
                                <div>Wallet type: {auth.account?.walletType}</div>
                            </li>
                            <li className="bg-blue-400 group w-full flex flex-col items-center justify-center rounded-md border-2 p-3">
                                <Wallet address={wever}/>
                                <Wallet address={usdt}/>
                            </li>
                        </ul>

                    </>
                ) : <></>}
            </>
        )
    }
)

export default Account;