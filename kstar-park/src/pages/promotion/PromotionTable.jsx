import React from 'react'
import { Header } from '../../components/Header'
import { SearchBar } from '../../components/SearchBar'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import PrivateRoute from '../../PrivateRoute';
import { ShowPromotionTable } from '../../components/promotion/ShowPromotionTable';
import { ShortBanner } from '../../components/ShortBanner';
import { useState } from 'react';

export const PromotionTable = () => {
  const [searchName,setSearchName] = useState('');
        
  function handleSearch(event){
    setSearchName(event.target.value);
  }
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <SearchBar onUpdateSearch={handleSearch}/>
    <ShortBanner/>
    <ShowPromotionTable searchName={searchName}/>
    <Footer/>
    </PrivateRoute>
  </>
  )
}
