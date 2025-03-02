import React, { useState } from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { ImportDrinkTable } from '../../components/import/ImportDrinkTable';
import PrivateRoute from '../../PrivateRoute';
import { ShortBanner } from '../../components/ShortBanner'

export const ImportDrinks = () => {
  const [searchDate,setSearchDate] = useState('');
        
  function handleSearch(event){
    setSearchDate(event.target.value);
  }


  return (
       <>
       <PrivateRoute>
        <Header/>
        <SearchBar onUpdateSearch={handleSearch}/>
        <Navigation/>
        <ShortBanner/>
        <ImportDrinkTable searchDate={searchDate}/>
        <Footer/>
       </PrivateRoute>
      </>
  )
}
