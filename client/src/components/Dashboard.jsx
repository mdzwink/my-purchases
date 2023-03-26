import ReceiptList from './ReceiptList';

export default function Home(props) {
  const { user } = props;
  
  return (
    <main className='view dm'>
        <ReceiptList  user={user}/>
    </main>
  )
}