import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { ImportDrinkUpdateForm } from '../../components/import/ImportDrinkUpdateForm'
import { useParams } from 'react-router-dom'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'

export const UpdateImportDrink = () => {
  const params = useParams();
  const importDrinkId = params.importDrinkId;

  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <ImportDrinkUpdateForm importDrinkId={importDrinkId}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
