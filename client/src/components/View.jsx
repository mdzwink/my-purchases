import ReceiptList from './ReceiptList';
import Add from './Add';

export default function View() {
  return (
    <div className='view'>
      <Add />
      <ReceiptList />
    </div>
  )
}