import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {DebtDeleteForm} from '../../components/debt/DebtDeleteForm'
import { useParams } from 'react-router-dom'

export const DeleteDebt = () => {
  const params = useParams();
  const debtId = params.debtId;
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <DebtDeleteForm debtId={debtId}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
