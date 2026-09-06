import React from 'react';
import Hero from '../components/Hero';
import Explore from '../components/Explore';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Safety from '../components/Safety';
import DriverPartner from '../components/DriverPartner';
import DriverCards from '../components/DriverCards';
import FAQ from '../components/FAQ';
import FinalCta from '../components/FinalCta';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Explore />
      <Services />
      <HowItWorks />
      <Safety />
      <DriverPartner />
      <DriverCards />
      <FAQ />
      <FinalCta />
    </>
  );
};

export default Home;
