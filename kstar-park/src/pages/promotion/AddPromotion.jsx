import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import PrivateRoute from '../../PrivateRoute';
import { AddPromotionForm } from '../../components/promotion/AddPromotionForm';

export const AddPromotion = () => {
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <AddPromotionForm/>
    <Footer/>
    </PrivateRoute>
  </>
  )
}
