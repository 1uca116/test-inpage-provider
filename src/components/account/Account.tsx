import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {useAuthStore} from "../../provider/AuthProvider";
import {useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import Wallet from "./Wallet";

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
            <div style={{display: 'flex', marginBottom: '20px'}}>
                {auth.loggedIn && auth.account?.address ? (
                    <>
                        <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
                            <div>Balance: {Number(balance) / 1000000000} EVER</div>
                            <div>Wallet type: {auth.account?.walletType}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Wallet address={'0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d'}/>
                            <Wallet address={'0:a519f99bb5d6d51ef958ed24d337ad75a1c770885dcd42d51d6663f9fcdacfb2'}/>
                        </div>
                    </>
                ) : <></>}
            </div>
        )
    }
)

export default Account;