import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'

export const SoldDrinks = () => {
  return (
    <>
    <Header/>
    <SearchBar/>
    <Navigation/>
    <Hero/>
    <Footer/>
  </>
  )
}
