import React, { useState } from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { DrinkTable } from '../../components/drinks/DrinkTable'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import PrivateRoute from '../../PrivateRoute'
import { ShortBanner } from '../../components/ShortBanner'


export const Drinks = () => {
  const [drinkName,setDrinkName] = useState('');

  function handleSearch(event){
    setDrinkName(event.target.value);
  }

  return (
    <>
    <PrivateRoute>
    <Header/>
    <SearchBar onUpdateSearch={handleSearch}/>
    <Navigation/>
    <ShortBanner/>
    <DrinkTable drinkName={drinkName}/>
    <Footer/>
    </PrivateRoute>
 
    </>
  )
}
