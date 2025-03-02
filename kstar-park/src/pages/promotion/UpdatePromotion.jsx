import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import PrivateRoute from '../../PrivateRoute';
import { useParams } from 'react-router-dom';

export const UpdatePromotion = () => {
    const params = useParams();
    const promotionId = params.promotionId;
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
