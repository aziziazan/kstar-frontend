import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {FloatUpdateForm} from '../../components/floot/FloatUpdateForm'
import { useParams } from 'react-router-dom'

export const UpdateFloat = () => {
  const params = useParams();
  const floatId = params.floatId; 
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <FloatUpdateForm floatId={floatId}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
