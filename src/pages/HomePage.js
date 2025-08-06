import React from 'react';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Faq from '../components/Faq';
import WhyUs from '../components/WhyUs';

const HomePage = () => (
  <>
    <Hero />
    <WhyUs /> 
    <Team />
    <Faq />
  </>
);

export default HomePage;