import React from 'react'
import { useState } from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { SoldDrinkTable } from '../../components/sold/SoldDrinkTable';
import PrivateRoute from '../../PrivateRoute';
import { ShortBanner } from '../../components/ShortBanner'

export const SoldDrinks = () => {
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
    <SoldDrinkTable searchDate={searchDate}/>
    <Footer/>
    </PrivateRoute>
  </>
  )
}
