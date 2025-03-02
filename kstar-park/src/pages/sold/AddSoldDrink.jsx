import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SoldDrinkAddForm } from '../../components/sold/SoldDrinkAddForm';
import PrivateRoute from '../../PrivateRoute';

export const AddSoldDrink = () => {
  return (
        <>
        <PrivateRoute>
        <Header/>
        <Navigation/>
        <Hero/>
        <SoldDrinkAddForm/>
        <Footer/>
        </PrivateRoute>
      </>
  )
}
