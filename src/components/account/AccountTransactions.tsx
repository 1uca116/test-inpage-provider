import {makeAutoObservable} from "mobx";
import {Transaction} from "everscale-inpage-provider/dist/models";
import {observer, useLocalObservable} from "mobx-react-lite";
import {useCallback, useEffect} from "react";
import {useAuthStore} from "../../provider/AuthProvider";
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {EverscaleStandaloneClient} from "everscale-standalone-client";
import TransactionList from "./TransactionsList";

class AccountObservableState {
    constructor() {
        makeAutoObservable(this);
    }

    items: Transaction[] = [];

    setItems(items: Transaction[]) {
        this.items = items;
    }
}

const AccountSection = observer(() => {
        const state = useLocalObservable(() => new AccountObservableState());

        const auth = useAuthStore();
        const ever = new ProviderRpcClient({
            fallback: () =>
                EverscaleStandaloneClient.create({
                    connection: 'mainnet',
                }),
        });

        const fetchData = useCallback(async () => {
            if (auth.account) {
                const address = new Address(auth.account.address);
                let result = await ever.getTransactions({address: address})
                state.setItems(result.transactions);
            }
        }, [state, auth.account]);

        useEffect(() => {
            fetchData();
        }, [fetchData]);

        return (
            <>
                {auth.loggedIn && auth.account?.address ? (

                        <p className='py-2'>
                            Transactions history:
                            <TransactionList items={state.items}/>
                        </p>
                    ) : <></>}
            </>
        )
    }
)

export default AccountSection