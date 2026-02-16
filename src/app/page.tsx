import React from 'react';
import { Footer } from '../components/landingPage/footer';
import { WhoItsForSection } from '../components/landingPage/whoItsForSection';
import { BuiltForFutureSection } from '../components/landingPage/forFutureSection';
import { PrivacySection } from '../components/landingPage/PrivacySection';
import DocumentationSection from '../components/landingPage/DocumentationSection';
import OurSolutionSection from '../components/landingPage/ourSolution';



const page = () => {
  return (
    <div>
      <DocumentationSection/>
      <OurSolutionSection/>
      <PrivacySection/>
      <WhoItsForSection/>
      <BuiltForFutureSection/>
      <Footer/>
    </div>
  );
};

export default page;