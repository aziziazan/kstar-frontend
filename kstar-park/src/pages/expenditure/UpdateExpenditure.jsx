import React from 'react'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { Footer } from '../../components/Footer'
import { Navigation } from '../../components/Navigation';
import { SearchBar } from '../../components/SearchBar'
import { ExpenditureUpdateForm } from '../../components/expenditure/ExpenditureUpdateForm';
import { useParams } from 'react-router-dom';

export const UpdateExpenditure = () => {
  const params = useParams();
  const expenditureId = params.expenditureId;

  return (
               <>
                <Header/>
                <Navigation/>
                <Hero/>
                <ExpenditureUpdateForm expenditureId={expenditureId}/>
                <Footer/>
              </>
  )
}
