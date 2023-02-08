

export function Searchbar(props) {
  const { searchQuery, setSearchQuery, handleSearchButton } = props;

  const handleSearchInput = (searchInput) => {
    const loweredInput = searchInput.toLowerCase();
    setSearchQuery(loweredInput);
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