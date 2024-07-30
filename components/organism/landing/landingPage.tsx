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

const LandingPage = () => {
  // const [loading, setLoading] = useState(true);
  // const [landingData, setLandingData] = useState<any>({});

  // useEffect(() => {
  //   const fetchAuthToken = async () => {
  //     try {
  //       const response = await axios.post(getAdminApiGetToken, {}, {
  //         headers: {
  //           'Authorization': `Basic ${Buffer.from('omerald_admin:omerald_admin_2024').toString('base64')}`,
  //         },
  //       });
  //       if (response.status === 200 && response.data.accessToken) {
  //         localStorage.setItem('token', response.data.accessToken);
  //         // toast.success('Authentication successful');
  //         return response.data.accessToken;
  //       }
  //       throw new Error('Failed to authenticate');
  //     } catch (error) {
  //       throw new Error('An error occurred during authentication.');
  //     }
  //   };

  //   const fetchData = async () => {
  //     let token = localStorage.getItem('token');
  //     if (!token) {
  //       token = await fetchAuthToken();
  //     }
  //     try {
  //       const response = await axios.get(getDiagnosticLandingData, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       setLandingData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching landing data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-white">
  //       <LandingBanner />
  //       <Spinner />
  //     </div>
  //   );
  // }

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
