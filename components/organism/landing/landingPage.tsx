import React from 'react';
import dynamic from 'next/dynamic';

const Partners = dynamic(() => import('@components/organism/landing/partners').then(res=>res.default))
const HelpYourBusiness = dynamic(() => import('@components/organism/landing/helpYourBusiness').then(res => res.HelpYourBusiness))
const LandingBanner = dynamic(() => import('@components/organism/landing/landingBanner').then(res=>res.default))
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
      <HelpYourBusiness />
      <Advertisement />
      <Testimonial />
      <ContactContainer />
      <BottomBanner />
    </div>
  );
};

export default LandingPage;