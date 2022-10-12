import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {EverscaleStandaloneClient} from "everscale-standalone-client";
import {useAuthStore} from "../../provider/AuthProvider";
import {useState} from "react";
import {observer} from "mobx-react-lite";

const Account = observer(() => {
        const auth = useAuthStore();
        const ever = new ProviderRpcClient({
            fallback: () =>
                EverscaleStandaloneClient.create({
                    connection: 'mainnet',
                }),
        });

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
                        <div>Balance: {Number(balance) / 1000000000} EVER</div>
                        <div>Wallet type: {auth.account?.walletType}</div>
                    </>
                ) : <></>}
            </>
        )
    }
)

export default Account;