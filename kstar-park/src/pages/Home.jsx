import React from 'react'
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';

export const Home = () => {
  return(
    <>
    <Header/>
    <SearchBar/>
    <Navigation/>
    <Hero/>
    <Footer/>
  </>
  );
}
