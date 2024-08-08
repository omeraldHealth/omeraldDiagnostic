import React, { useEffect } from 'react';

import LandingBanner from '@components/organism/landing/landingBanner';
import { useUser } from '@clerk/clerk-react';
import { useGetUser } from '@utils/reactQuery';
import { useRouter } from 'next/router';
// import Partners from '@components/organism/landing/partners';
// import { HelpYourBusiness } from '@components/organism/landing/helpYourBusiness';
// import { Advertisement } from '@components/organism/landing/advertisement';
// import { Testimonial } from '@components/organism/landing/testimonial';
// import { ContactContainer } from '@components/organism/landing/contactContainer';
// import { BottomBanner } from '@components/organism/landing/bottomBanner';
// import { Loader } from '@components/atoms/loader/loader';
// import { Spinner } from '@components/atoms/loader';


const LandingPage = () => {
  const {user} = useUser()

  return (
    <div>
      <LandingBanner />
    </div>
  );
};

export default LandingPage;
