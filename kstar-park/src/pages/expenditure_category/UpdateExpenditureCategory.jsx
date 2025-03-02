import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import PrivateRoute from '../../PrivateRoute';

export const UpdateExpenditureCategory = () => {
  const params = useParams();
  const categoryExpenditureId = params.categoryExpenditureId;

  return (
               <>
               <PrivateRoute>
               <Header/>
                <Navigation/>
                <Hero/>
                <Footer/>
               </PrivateRoute>
              </>
  )
}
