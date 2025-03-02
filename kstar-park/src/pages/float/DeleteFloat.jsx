import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {FloatDeleteForm} from '../../components/floot/FloatDeleteForm'
import { useParams } from 'react-router-dom'

export const DeleteFloat = () => {
  const params = useParams();
  const floatId = params.floatId;
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <FloatDeleteForm floatId={floatId}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
