import React, { useEffect, useState } from "react";

export function Searchbar(props) {
  const { setSearchQuery, handleSearchButton } = props;

  return (
    <>
      <form>
        <label>🔍</label>
        <input
          type="text"
          placeholder="... search by store name or date"
          onChange={e => setSearchQuery(e.target.value)}
          className="searchbar"
        ></input>
        <button className="button" onClick={handleSearchButton}>Search</button>
      </form>
    </>
  )
}