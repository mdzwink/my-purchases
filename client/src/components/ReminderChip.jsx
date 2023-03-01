import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { deleteReminder } from "./helpers";

const ReminderChip = (props) => {
  // exptracting props from props making into own constant variable
  const { id, date, return_by } = props;

  const handleDeleteReminder = (id) =>{
    deleteReminder(id);
  }

  const calcDaysUntil = (startDate, endDate) => {
    const returnDate = new Date(endDate)
    const reminderDate = new Date(startDate)
    const diff = returnDate.getTime() - reminderDate.getTime();

    const daysBefore = Math.ceil(diff / (1000 * 3600 * 24));

    return daysBefore
  }
  const formattedDateMssg = () => {
    const daysBefore = calcDaysUntil(date, return_by)
    const mssg = daysBefore + 'd before'
    return mssg;
  }

  return (
      <div key={id} onClick={() => handleDeleteReminder()}>
        {formattedDateMssg()}<FontAwesomeIcon icon={faClose} /> 
      </div>
  )
}

export default ReminderChip;