import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { ImportDrinkAddForm } from '../../components/import/ImportDrinkAddForm'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'


export const AddImportDrink = () => {
  return (
           <>
           <PrivateRoute>
            <Header/>
            <Navigation/>
            <Hero/>
            <ImportDrinkAddForm/>
            <Footer/>
           </PrivateRoute>
          </>
  )
}
