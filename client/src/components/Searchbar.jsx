

export function Searchbar(props) {

  const handleSearchInput = (searchInput) => {
    const loweredInput = searchInput.toLowerCase();
    setSearchQuery(loweredInput);
  }

  // FROM DASHBOARD:
  const [allReceipts, setAllReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearchButton = (e) => {
    e.preventDefault();
    setSearchQuery('');
  }
  
  // Live search current receipt state
  let searchResults = [];
  const searchFor = () => {
    if(receipts) {
    searchResults = [];
    const receiptsCopy = [...receipts]
    receiptsCopy.map(receipt => (
      receipt.store.toLowerCase().includes(searchQuery)? searchResults.push(receipt) : receipt.date.includes(searchQuery)? searchResults.push(receipt) : false
    ))
    if (searchResults !== []) {
      setReceipts(searchResults);
    }}
    return false
  }

  // always filter out receipts with past return_by
  // button and function to show just "archive"
  // button and function to show all receipts

  // receipts state holds all the users receipts -->


  useEffect(() => {
    searchFor();
  }, [searchQuery])

  
  //return array of only the receipts that meet filter conditions
  const handleFilter = (filter) => {
    const filteredReceipts = allReceipts.map(receipt => {
      const today = Number(new Date());
      const return_byMS = Number(new Date(receipt.return_by));
      if(filter === "all") {
        return receipt;
      }
      if(filter === "archive" && return_byMS < today) {
        return receipt;
      }
      if(filter === "current" && return_byMS > today) {
        return receipt;
      }
      return false;
    })
    return setReceipts(filteredReceipts.filter(receipt => receipt !== false)); 
  }
  return (
    <>
      <form className="searchbar" >
        <button onClick={() => handleFilter('all')} >all</button>
        <button onClick={() => handleFilter('archive')} >archive</button>
        <button onClick={() => handleFilter('current')} >current</button>
        <button className="searchbar-button" onClick={handleSearchButton}>Show All</button>
        <input
          type="text"
          placeholder="or... search by store name or date yyyy/mm/dd"
          onChange={e => handleSearchInput(e.target.value)}
          className="searchbar-input"
          value={searchQuery}
        ></input>
      </form>
    </>
  )
}