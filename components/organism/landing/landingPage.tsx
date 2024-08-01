import React, { useEffect, useState } from 'react';
import { getAdminApiGetToken, getDiagnosticLandingData } from '@utils';
import { toast } from 'react-toastify';
import axios from 'axios';

import Partners from '@components/organism/landing/partners';
import LandingBanner from '@components/organism/landing/landingBanner';
import { HelpYourBusiness } from '@components/organism/landing/helpYourBusiness';
import { Advertisement } from '@components/organism/landing/advertisement';
import { Testimonial } from '@components/organism/landing/testimonial';
import { ContactContainer } from '@components/organism/landing/contactContainer';
import { BottomBanner } from '@components/organism/landing/bottomBanner';
import { Loader } from '@components/atoms/loader/loader';
import { Spinner } from '@components/atoms/loader';
import { useUser } from '@clerk/clerk-react';
import { useGetUser } from 'utils/reactQuery';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const {user} = useUser()
  const router = useRouter()
  const {data: UserData, refetch} = useGetUser({userPhoneNumber: user?.phoneNumbers[0]?.phoneNumber})

  useEffect(()=>{refetch()
    // router.reload()
  },[])

  return (
    <div>
      <LandingBanner />
      {/* <Partners /> */}
      {/* <HelpYourBusiness /> */}
      {/* <Advertisement advertisementBanner={landingData} /> */}
      {/* <Testimonial testimonials={landingData} /> */}
      {/* <ContactContainer /> */}
      {/* <BottomBanner /> */}
    </div>
  );
};

export default LandingPage;
