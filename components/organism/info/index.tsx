import React, { useEffect, useState } from 'react';
import styles from '@styles/signIn.module.css';
import { getDiagnosticSetting } from '@utils';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Spinner } from '@components/atoms/loader';
import { ColorRing } from 'react-loader-spinner';

interface InfoPageProps {
  detail: string;
}

export const InfoPage: React.FC<InfoPageProps> = ({ detail }) => {
  const [formValues, setFormValues] = useState({ description: '' });
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Optional, if you need to specify content type
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let diagnosticSettings = await axios.get(getDiagnosticSetting, config);
        if (diagnosticSettings.status === 200) {
          setFormValues({ description: diagnosticSettings?.data[0]?.settings?.[detail] || '' });
        }
      } catch (error) {
        console.error('Error fetching diagnostic settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [detail]);

  return (
    <div className="py-[5vh] mx-10">
      <section className="max-w-[80%] m-auto h-auto my-40 sm:my-20 2xl:my-0">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="spinner-border inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm font-light text-blue-900">
            {ReactHtmlParser(formValues.description || 'No description available.')}
          </div>
        )}
      </section>
    </div>
  );
};

export default InfoPage;
