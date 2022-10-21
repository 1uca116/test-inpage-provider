import {Transaction} from "everscale-inpage-provider/dist/models";
import moment from 'moment';

interface ITransactionProps {
    item: Transaction;
}

const TransactionInfo = (props: ITransactionProps) => {
    const unixDateToStr = (number: number, format: string) => {
        return moment.unix(number).format(format);
    };

    return (
        <li className='flex items-center gap-3'>
            <div>{unixDateToStr(props.item.createdAt, 'DD.MM.YY HH:mm:ss')}</div>
            <div>{Number(props.item.inMessage.value) / 1000000000} EVER</div>
        </li>
    )
}


interface ITransactionListProps {
    items: Transaction[];
}

const TransactionList = (props: ITransactionListProps) => {
    return (
        <ol>
            {props.items?.map((item: Transaction, index) => (
                <TransactionInfo item={item} key={index}/>
            ))}
        </ol>
    );
};

export default TransactionList