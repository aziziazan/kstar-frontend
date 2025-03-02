import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { useState } from 'react';
import { ExpenditureCategoryTable } from '../../components/expenditure_category/ExpenditureCategoryTable';
import PrivateRoute from '../../PrivateRoute';
import { ShortBanner } from '../../components/ShortBanner'

export const ExpenditureCategory = () => {
    const [expenditureCategoryName,setExpenditureCategoryName] = useState('');
  
    function handleSearch(event){
      setExpenditureCategoryName(event.target.value);
    }

  return (
               <>
               <PrivateRoute>
               <Header/>
                <SearchBar onUpdateSearch={handleSearch} />
                <Navigation/>
                <ShortBanner/>
                <ExpenditureCategoryTable expenditureCategoryName={expenditureCategoryName}/>
                <Footer/>
               </PrivateRoute>

              </>
  )
}
