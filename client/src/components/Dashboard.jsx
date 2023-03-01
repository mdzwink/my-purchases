import ReceiptList from './ReceiptList';

export default function Home(props) {
  const { user, receipts, setReceipts } = props;
  
  return (
    <main className='view dm'>
        <ReceiptList  user={user} receipts={receipts} setReceipts={setReceipts} />
    </main>
  )
}