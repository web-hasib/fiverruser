import Assistants from "../components/landingPage/(new components)/Assistants";
import { ContactSection } from "../components/landingPage/(new components)/ContactSection";
import FAQ from "../components/landingPage/(new components)/FAQ";
import Features from "../components/landingPage/(new components)/Features";
import { Footer } from "../components/landingPage/(new components)/footer";
import Hero from "../components/landingPage/(new components)/Hero";
import Navbar from "../components/landingPage/(new components)/Navber";
import Specialities from "../components/landingPage/(new components)/Specialities";
import Workflow from "../components/landingPage/(new components)/Workflow";
import { DataSafetySection } from "../components/landingPage/DataSafetySection";

const page = () => {
  return (
    <div className="font-inter">
      <Navbar />
      <Hero/>
      <Features />
      <Workflow />
      <Assistants />
      <Specialities />
      <FAQ />
      <DataSafetySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default page;
