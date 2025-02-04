import React, { useState } from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { DrinkTable } from '../../components/drinks/DrinkTable'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'


export const Drinks = () => {
  const [drinkName,setDrinkName] = useState('');

  function handleSearch(event){
    setDrinkName(event.target.value);
  }

  return (
    <>
    <Header/>
    <SearchBar onUpdateSearch={handleSearch}/>
    <Navigation/>
    <Hero/>
    <DrinkTable drinkName={drinkName}/>
    <Footer/>
    </>
  )
}
