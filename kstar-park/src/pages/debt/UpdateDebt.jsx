import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import PrivateRoute from '../../PrivateRoute'
import { Navigation } from '../../components/Navigation'
import {DebtUpdateForm} from '../../components/debt/DebtUpdateForm'
import { useParams } from 'react-router-dom'

export const UpdateDebt = () => {
  const params = useParams();
  const debtId = params.debtId;
  return (
    <>
    <PrivateRoute>
    <Header/>
    <Navigation/>
    <Hero/>
    <DebtUpdateForm debtId={debtId}/>
    <Footer/>
    </PrivateRoute>
    </>
  )
}
