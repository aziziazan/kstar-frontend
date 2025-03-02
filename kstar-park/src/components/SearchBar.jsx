import React from 'react'
import './SearchBar.css'

export const SearchBar = (props) => {
  return (
    <>
    <div className="heading">
        <div  className="search-bar">
              <input type="search" placeholder='Bofya hapa kutafuta' id="" onChange={props.onUpdateSearch}/>
        </div>
    </div>
    </>
  )
}
