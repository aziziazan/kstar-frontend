import React, { useState } from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { ImportDrinkTable } from '../../components/import/ImportDrinkTable';

export const ImportDrinks = () => {

  return (
       <>
        <Header/>
        <SearchBar/>
        <Navigation/>
        <Hero/>
        <ImportDrinkTable/>
        <Footer/>
      </>
  )
}
