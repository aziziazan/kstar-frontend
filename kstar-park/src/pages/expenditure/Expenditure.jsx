import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { useState } from 'react';
import { ExpenditureTable } from '../../components/expenditure/ExpenditureTable';
import PrivateRoute from '../../PrivateRoute';
import { ShortBanner } from '../../components/ShortBanner'

export default function Expenditure() {
  const [searchDate,setSearchDate] = useState('');
        
  function handleSearch(event){
    setSearchDate(event.target.value);
  }

  return (
           <>
           <PrivateRoute>
           <Header/>
            <SearchBar onUpdateSearch={handleSearch} />
            <Navigation/>
            <ShortBanner/>
            <ExpenditureTable searchDate={searchDate}/>
            <Footer/>
           </PrivateRoute>
          </>
  )
}
