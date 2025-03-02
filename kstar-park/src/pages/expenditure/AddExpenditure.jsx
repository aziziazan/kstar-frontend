import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { ExpenditureAddForm } from '../../components/expenditure/ExpenditureAddForm';
import PrivateRoute from '../../PrivateRoute';

export const AddExpenditure = () => {
  return (
               <>
               <PrivateRoute>
               <Header/>
                <Navigation/>
                <Hero/>
                <ExpenditureAddForm/>
                <Footer/>
               </PrivateRoute>
              </>
  )
}
