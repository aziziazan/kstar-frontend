import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { ImportDrinkDeleteForm } from '../../components/import/ImportDrinkDeleteForm'
import { useParams } from 'react-router-dom'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'

export const DeleteImportDrink = () => {
  const params = useParams();
  const importDrinkId = params.importDrinkId;
  return (
        <>
        <PrivateRoute>
        <Header/>
        <Navigation/>
         <Hero/>
        <ImportDrinkDeleteForm importDrinkId={importDrinkId}/>
        <Footer/>
        </PrivateRoute>

        </>
  )
}
