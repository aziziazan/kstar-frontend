import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { ImportDrinkDeleteForm } from '../../components/import/ImportDrinkDeleteForm'
import { useParams } from 'react-router-dom'

export const DeleteImportDrink = () => {
  const params = useParams();
  const importDrinkId = params.importDrinkId;
  return (
        <>
            <Header/>
            <Hero/>
            <ImportDrinkDeleteForm importDrinkId={importDrinkId}/>
            <Footer/>
        </>
  )
}
