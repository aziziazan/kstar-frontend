import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import PrivateRoute from '../../PrivateRoute';
import { UpdateBuyingPriceForm } from '../../components/profit/UpdateBuyingPriceForm';
import { useParams } from 'react-router-dom';

export const UpdateBuyingPrice = () => {
    const params = useParams();
    const soldDrinkId = params.soldDrinkId;
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <UpdateBuyingPriceForm soldDrinkId={soldDrinkId}/>
    <Footer/>
    </PrivateRoute>
  </>
  )
}
