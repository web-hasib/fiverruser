import React from 'react';
import { Footer } from '../components/landingPage/footer';
import { WhoItsForSection } from '../components/landingPage/whoItsForSection';
import { BuiltForFutureSection } from '../components/landingPage/forFutureSection';
import { PrivacySection } from '../components/landingPage/PrivacySection';
import DocumentationSection from '../components/landingPage/DocumentationSection';
import OurSolutionSection from '../components/landingPage/ourSolution';
import Navbar from '../components/landingPage/Navber';

import CoreFeatures from '../components/landingPage/CoreFeatures';
import HowItWorks from '../components/landingPage/HowItWorks';



const page = () => {
  return (
    <div>
      <Navbar/>
      <DocumentationSection/>
      <OurSolutionSection/>
      <CoreFeatures/>
      <HowItWorks/>
      <PrivacySection/>
      <WhoItsForSection/>
      <BuiltForFutureSection/>
      <Footer/>
    </div>
  );
};

export default page;