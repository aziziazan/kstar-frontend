import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { useParams } from 'react-router-dom'
import { DrinkDeleteForm } from '../../components/drinks/DrinkDeleteForm';


export const DeleteDrink = () => {
    const params = useParams();
    const drinkId = params.drinkId;

  return (
    <>
    <Header/>
    <Hero/>
    <DrinkDeleteForm drinkId={drinkId}/>
    <Footer/>
    </>
  )
}
