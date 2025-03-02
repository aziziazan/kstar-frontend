import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import PrivateRoute from '../../PrivateRoute';
import { SummaryTable } from '../../components/summary/SummaryTable';
import { ShortBanner } from '../../components/ShortBanner'

export const Summary = () => {
  return (
    <>
    <PrivateRoute>
     <Header/>
     <SearchBar/>
     <Navigation/>
     <ShortBanner/>
     <SummaryTable/>
     <Footer/>
    </PrivateRoute>
   </>
  )
}
