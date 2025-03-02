import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import { ExpenditureDeleteForm } from '../../components/expenditure/ExpenditureDeleteForm';
import PrivateRoute from '../../PrivateRoute';

export const DeleteExpenditure = () => {
  const params = useParams();
  const expenditureId = params.expenditureId;

  return (
               <>
               <PrivateRoute>
               <Header/>
                <Navigation/>
                <Hero/>
                <ExpenditureDeleteForm expenditureId={expenditureId}/>
                <Footer/>
               </PrivateRoute>
              </>
  )
}
