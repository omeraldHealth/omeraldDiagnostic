import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useQueryGetData } from 'utils/reactQuery';
import { getAdminApiGetToken, getDiagnosticLandingData } from '@utils';
import axios from 'axios';
import { toast } from 'react-toastify';


const Partners = dynamic(() => import('@components/organism/landing/partners').then(res=>res.default))
const HelpYourBusiness = dynamic(() => import('@components/organism/landing/helpYourBusiness').then(res => res.HelpYourBusiness))
const LandingBanner = dynamic(() => import('@components/organism/landing/landingBanner').then(res=>res.default))
const Advertisement = dynamic(() => import('@components/organism/landing/advertisement').then(res => res.Advertisement))
const Testimonial = dynamic(() => import('@components/organism/landing/testimonial').then(res => res.Testimonial))
const ContactContainer = dynamic(() => import('@components/organism/landing/contactContainer').then(res => res.ContactContainer))
const BottomBanner = dynamic(() => import('@components/organism/landing/bottomBanner').then(res => res.BottomBanner))

// LandingPage component
const LandingPage = () => {

  const token = localStorage.getItem('token');
  const [landingData, setLandingData] = useState({});

  // Your username and password for Basic Authentication
  const username = 'omerald_admin';
  const password = 'omerald_admin_2024';

// Encode the username and password to Base64
  const basicAuthCredentials = Buffer.from(`${username}:${password}`).toString('base64');
  const fetchAuthToken = async () => {
    try {
      const response = await axios.post(getAdminApiGetToken, {}, {
        headers: {
          'Authorization': `Basic ${`${basicAuthCredentials}`}`,
        },
      });
  
      if (response.status === 200 && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        toast.success('Authentication successful');
      } else {
        throw new Error('Failed to authenticate');
      }
    } catch (error) {
      throw new Error('An error occurred during authentication.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        fetchAuthToken();
      } else {
        try {
          const response = await axios.get(getDiagnosticLandingData, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setLandingData(response.data);
        } catch (error) {
          console.error('Error fetching landing data:', error);
        }
      }
    };fetchData();

  }, [token]);

  console.log(landingData)
  return (
    <div>
      <LandingBanner />
      <Partners customerLogos={landingData}/>
      <HelpYourBusiness />
      <Advertisement advertisementBanner={landingData} />
      <Testimonial  testimonials={landingData} />
      <ContactContainer />
      <BottomBanner />
    </div>
  );
};

export default LandingPage;