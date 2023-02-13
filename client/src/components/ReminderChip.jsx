import moment from "moment";


const ReminderChip = (props) => {
  // exptracting props from props making into own constant variable
  const { date, receipt_date } = props;
  



  const formattedDate = () => {
    // take reminder date and receipt date and calculate differance
    // format as __d before
    
    // return moment.utc(date.toLocaleString()).format("");
    return 'test chip'
  }

  return (
    <>
      <p>
        {formattedDate()}
      </p>
    </>
  )
}

export default ReminderChip;