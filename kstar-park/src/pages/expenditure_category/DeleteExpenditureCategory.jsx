import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import { ExpenditureCategoryDeleteForm } from '../../components/expenditure_category/ExpenditureCategoryDeleteForm';
import PrivateRoute from '../../PrivateRoute';

export const DeleteExpenditureCategory = () => {
  const params = useParams();
  const categoryExpenditureId = params.categoryExpenditureId;

  return (
               <>
               <PrivateRoute>
               <Header/>
                <Navigation/>
                <Hero/>
                <ExpenditureCategoryDeleteForm categoryExpenditureId={categoryExpenditureId}/>
                <Footer/>
               </PrivateRoute>
              </>
  )
}
