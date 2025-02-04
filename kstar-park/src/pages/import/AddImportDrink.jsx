import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { ImportDrinkAddForm } from '../../components/import/ImportDrinkAddForm'


export const AddImportDrink = () => {
  return (
           <>
            <Header/>
            <Hero/>
            <ImportDrinkAddForm/>
            <Footer/>
          </>
  )
}
