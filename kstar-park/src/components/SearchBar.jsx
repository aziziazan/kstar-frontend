import React from 'react'
import './SearchBar.css'

export const SearchBar = (props) => {
  return (
    <>
    <div className="heading">
        <div  className="search-bar">
              <input type="search" placeholder='Tafuta kinywaji..' id="" onChange={props.onUpdateSearch}/>
        </div>
    </div>
    </>
  )
}
