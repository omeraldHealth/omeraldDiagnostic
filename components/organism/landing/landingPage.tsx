import React from 'react';
import dynamic from 'next/dynamic';

const Partners = dynamic(() => import('@components/organism/landing/partners').then(res=>res.Partners))
const HowItWorks = dynamic(() => import('@components/organism/landing/howItWorks').then(res => res.HowItWorks))
const HelpYourBusiness = dynamic(() => import('@components/organism/landing/helpYourBusiness').then(res => res.HelpYourBusiness))
const LandingBanner = dynamic(() => import('@components/organism/landing/landingBanner').then(res=>res.LandingBanner))
const Advertisement = dynamic(() => import('@components/organism/landing/advertisement').then(res => res.Advertisement))
const Testimonial = dynamic(() => import('@components/organism/landing/testimonial').then(res => res.Testimonial))
const ContactContainer = dynamic(() => import('@components/organism/landing/contactContainer').then(res => res.ContactContainer))
const BottomBanner = dynamic(() => import('@components/organism/landing/bottomBanner').then(res => res.BottomBanner))

// LandingPage component
const LandingPage = () => {
  return (
    <div>
      <LandingBanner />
      <Partners />
      <HowItWorks />
      <HelpYourBusiness />
      <Advertisement />
      <Testimonial />
      <ContactContainer />
      <BottomBanner />
    </div>
  );
};

export default LandingPage;