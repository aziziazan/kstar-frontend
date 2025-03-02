import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {DebtAddForm} from '../../components/debt/DebtAddForm'


export const AddDebt = () => {
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <DebtAddForm/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
