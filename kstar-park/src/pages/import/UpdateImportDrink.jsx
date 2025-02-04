import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { ImportDrinkUpdateForm } from '../../components/import/ImportDrinkUpdateForm'
import { useParams } from 'react-router-dom'

export const UpdateImportDrink = () => {
  const params = useParams();
  const importDrinkId = params.importDrinkId;

  return (
    <>
       <Header/>
       <Hero/>
       <ImportDrinkUpdateForm importDrinkId={importDrinkId}/>
       <Footer/>
    </>
  )
}
