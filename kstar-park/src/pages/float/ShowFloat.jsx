import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {FloatTable} from '../../components/floot/FloatTable'
import { SearchBar } from '../../components/SearchBar'
import { useState } from 'react'
import { ShortBanner } from '../../components/ShortBanner'

export const ShowFloat = () => {
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
    <FloatTable searchDate={searchDate}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}

