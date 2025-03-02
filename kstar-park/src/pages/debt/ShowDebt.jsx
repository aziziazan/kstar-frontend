import React from 'react'
import { Header } from '../../components/Header'
import { ShortBanner } from '../../components/ShortBanner'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {DebtTable} from '../../components/debt/DebtTable'
import { SearchBar } from '../../components/SearchBar'
import { useState } from 'react'


export const ShowDebt = () => {
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
    <DebtTable searchDate={searchDate}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
