import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SoldDrinkDeleteForm } from '../../components/sold/SoldDrinkDeleteForm';
import { useParams } from 'react-router-dom'
import PrivateRoute from '../../PrivateRoute';

export const DeleteSoldDrink = () => {
  const params = useParams();
  const soldDrinkId = params.soldDrinkId;
  return (
        <>
        <PrivateRoute>
        <Header/>
        <Navigation/>
        <Hero/>
        <SoldDrinkDeleteForm soldDrinkId={soldDrinkId}/>
        <Footer/>
        </PrivateRoute>
      </>
  )
}
