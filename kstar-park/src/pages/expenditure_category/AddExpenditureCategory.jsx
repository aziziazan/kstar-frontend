import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { ExpenditureCategoryAddForm } from '../../components/expenditure_category/ExpenditureCategoryAddForm';
import PrivateRoute from '../../PrivateRoute';

export const AddExpenditureCategory = () => {
  return (
               <>
               <PrivateRoute>
               <Header/>
                <Navigation/>
                <Hero/>
                <ExpenditureCategoryAddForm/>
                <Footer/>
               </PrivateRoute>
              </>
  )
}
