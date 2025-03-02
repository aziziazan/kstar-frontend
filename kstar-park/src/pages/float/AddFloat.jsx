import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {FloatAddForm} from '../../components/floot/FloatAddForm'

export const AddFloat = () => {
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <FloatAddForm/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
