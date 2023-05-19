import { Transaction } from 'everscale-inpage-provider/dist/models';
import moment from 'moment';

interface ITransactionProps {
  item: Transaction;
}

const TransactionInfo = (props: ITransactionProps) => {
  const unixDateToStr = (number: number, format: string) => {
    return moment.unix(number).format(format);
  };

  return (
    <tr>
      <td className='p-2 border-2 '>
        {unixDateToStr(props.item.createdAt, 'DD.MM.YY HH:mm:ss')}
      </td>
      <td className='p-2 border-2 '>
        {props.item.inMessage.value !== '0' ? (
          <>{Number(props.item.inMessage.value) / 1000000000} EVER</>
        ) : (
          ''
        )}
      </td>
      <td className='p-2 border-2 '>
        {props.item.outMessages?.map((x) =>
          x.value ? (
            <>
              {props.item.outMessages.map((x) => Number(x.value) / 1000000000)}{' '}
              EVER
            </>
          ) : (
            ''
          )
        )}
      </td>
    </tr>
  );
};

interface ITransactionListProps {
  items: Transaction[];
}

const TransactionList = (props: ITransactionListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th className='p-2 border-2 '>Date</th>
          <th className='p-2 border-2 '>Incoming transactions</th>
          <th className='p-2 border-2 '>Outgoing transactions</th>
        </tr>
      </thead>
      <tbody>
        {props.items?.map((item: Transaction, index) => (
          <TransactionInfo item={item} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
