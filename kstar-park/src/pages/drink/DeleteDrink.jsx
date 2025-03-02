import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { useParams } from 'react-router-dom'
import { DrinkDeleteForm } from '../../components/drinks/DrinkDeleteForm';
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'


export const DeleteDrink = () => {
    const params = useParams();
    const drinkId = params.drinkId;

  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <DrinkDeleteForm drinkId={drinkId}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
