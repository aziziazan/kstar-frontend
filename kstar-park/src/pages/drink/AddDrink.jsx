import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import {DrinkAddForm} from '../../components/drinks/DrinkAddForm'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'

export const AddDrink = () => {
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <DrinkAddForm/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
