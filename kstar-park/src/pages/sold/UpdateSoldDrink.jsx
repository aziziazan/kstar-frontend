import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import PrivateRoute from '../../PrivateRoute';

export const UpdateSoldDrink = () => {
  return (
        <>
        <PrivateRoute>
        <Header/>
        <Navigation/>
        <Hero/>
        <Footer/>
        </PrivateRoute>
      </>
  )
}
