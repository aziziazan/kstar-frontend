import React from 'react'
import { useState } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import PrivateRoute from '../../PrivateRoute';
import { ShortBanner } from '../../components/ShortBanner'
import { ProfitTable } from '../../components/profit/ProfitTable'

export const SoldDrinkProfit = () => {
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
    <ProfitTable searchDate={searchDate}/>
    <Footer/>
    </PrivateRoute>
  </>
  )
}
