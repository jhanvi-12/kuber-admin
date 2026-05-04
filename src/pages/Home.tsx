import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import RentalOffers from '../components/RentalOffers';
import DriverPartner from '../components/DriverPartner';
import AppDownload from '../components/AppDownload';
import Cities from '../components/Cities';
import Testimonials from '../components/Testimonials';
import FareCalculator from '../components/FareCalculator';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import About from '../components/About';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <RentalOffers />
      <DriverPartner />
      <FareCalculator />
      <AppDownload />
      <Testimonials />
      <Cities />
      <About />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;