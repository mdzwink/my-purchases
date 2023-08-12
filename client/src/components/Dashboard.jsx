import ReceiptList from './ReceiptList';

export default function Dashboard(props) {
  const { user, addReceiptMode, addFormToggle } = props;
  
  return (
    <main className='view dm'>
        <ReceiptList  user={user} addReceiptMode={addReceiptMode} addFormToggle={addFormToggle} />
    </main>
  )
}