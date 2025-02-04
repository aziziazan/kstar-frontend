import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import {DrinkAddForm} from '../../components/drinks/DrinkAddForm'

export const AddDrink = () => {
  return (
    <>
    <Header/>
    <Hero/>
    <DrinkAddForm/>
    <Footer/>
    </>
  )
}
