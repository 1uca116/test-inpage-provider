import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import {useAuthStore} from "../../provider/AuthProvider";
import BigNumber from "bignumber.js";

interface ITokenModel {
    total: BigNumber;
    symbol: string;
}
interface IWallet {
    address: string
}

const Wallet = observer((props: IWallet) => {
    const ever = useMemo(()=> new ProviderRpcClient(), [] );

    const auth =  useAuthStore();
    const [balances, setTokenBalances] = useState<ITokenModel[]>([]);

    useEffect(() => {
        async function getTokenBalance() {

            const tokenRootAbi = {
                'ABI version': 2,
                "version": "2.2",
                'header': ['pubkey', 'time', 'expire'],
                'functions': [
                    {
                        "name": "walletOf",
                        "inputs": [
                            {"name": "answerId", "type": "uint32"},
                            {"name": "walletOwner", "type": "address"}
                        ],
                        "outputs": [
                            {"name": "value0", "type": "address"}
                        ]
                    },
                    {
                        "name": "symbol",
                        "inputs": [
                            {"name": "answerId", "type": "uint32"}
                        ],
                        "outputs": [
                            {"name": "value0", "type": "string"}
                        ]
                    },
                    {
                        "name": "decimals",
                        "inputs": [
                            {"name": "answerId", "type": "uint32"}
                        ],
                        "outputs": [
                            {"name": "value0", "type": "uint8"}
                        ]
                    },
                ],
                'data': [],
                'events': [],
            } as const;

            const tokenWalletAbi = {
                'ABI version': 2,
                'header': ['pubkey', 'time', 'expire'],
                'functions': [{
                    "name": "balance",
                    "inputs": [
                        {"name": "answerId", "type": "uint32"}
                    ],
                    "outputs": [
                        {"name": "value0", "type": "uint128"}
                    ]
                }],
                'data': [],
                'events': [],
            } as const;

            const addressTokenRoot = new Address(props.address);

            let balances: ITokenModel[] = [];

            if (auth.account) {
                const contract = new ever.Contract(tokenRootAbi, addressTokenRoot);

                const address = new Address(auth.account.address);
                const tokenWalletAddress = await contract
                    .methods
                    .walletOf(
                        {
                            answerId: 0,
                            walletOwner: address,
                        },
                    ).call({responsible: true});

                const tokenDecimalsString = await contract
                    .methods
                    .decimals({answerId: 0})
                    .call({responsible: true});

                const tokenDecimals = Number.parseInt(tokenDecimalsString.value0);

                const tokenSymbol = await contract
                    .methods
                    .symbol({answerId: 0})
                    .call({responsible: true})

                let resultBalance = '0';
                try {
                    const tokenWalletContract = new ever.Contract(tokenWalletAbi, tokenWalletAddress.value0);
                    const tokenBalance = await tokenWalletContract
                        .methods
                        .balance({
                            answerId: 0
                        }).call({
                            responsible: true
                        });
                    resultBalance = tokenBalance.value0;

                } catch (e) {
                }
                const balance = (new BigNumber(resultBalance).div(new BigNumber(10).pow(tokenDecimals)));
                balances.push({total: balance, symbol: tokenSymbol.value0});
                setTokenBalances(balances);
            }
        }
        getTokenBalance().catch(console.error);
    }, [])


    const WalletItem = (props: {tokens: ITokenModel[]}) => {
        return (
            <div className='flex'>
                Wallet:
                {props.tokens.map((x, index) => (<div key={index}>
                    <>{x.total.toString()} {x.symbol}</>
                </div>))}
            </div>
        )
    }

    return (
        <div className='flex'>
            <WalletItem tokens={balances}/>
        </div>
    )
})

export default Wallet
