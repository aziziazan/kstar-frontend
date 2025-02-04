import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { DrinkUpdateForm } from '../../components/drinks/DrinkUpdateForm'
import { useParams } from 'react-router-dom'

export const UpdateDrink = () => {
    const params = useParams();
    const drinkId = params.drinkId;
    
  return (
    <>
        <Header/>
        <Hero/>
        <DrinkUpdateForm drinkId={drinkId}/>
        <Footer/>
    </>
  )
}
