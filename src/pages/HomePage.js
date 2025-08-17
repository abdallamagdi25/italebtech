import React from 'react';
import Hero from '../components/Hero';
import Faq from '../components/Faq';
import WhyUs from '../components/WhyUs';
import ArticlesSlider from '../components/ArticlesSlider';

const HomePage = () => (
  <>
    <Hero />
    <WhyUs />
    <ArticlesSlider />
    <Faq />
  </>
);

export default HomePage;