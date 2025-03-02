import React from 'react'
import { useState } from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import PrivateRoute from '../../PrivateRoute';
import { RemainDrinks } from '../../components/sold/RemainDrinks'
import { ShortBanner } from '../../components/ShortBanner'

export const ViewRemainDrink = () => {
      const [searchName,setSearchName] = useState('');
        
      function handleSearch(event){
        setSearchName(event.target.value);
      }
  return (
    <>
    <PrivateRoute>
    <Header/>
    <SearchBar onUpdateSearch={handleSearch} />
    <Navigation/>
    <ShortBanner/>
    <RemainDrinks searchName={searchName}/>
    <Footer/>
    </PrivateRoute>
  </>
  )
}
