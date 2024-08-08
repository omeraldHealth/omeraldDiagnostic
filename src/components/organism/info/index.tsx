import React, { useEffect, useState } from 'react';
import { getDiagnosticSetting } from '@utils/index';
import axios from 'axios';
import { Spinner } from '@components/atoms/loader';

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
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 3000) // 5 seconds timeout
      );

      try {
        const response = await Promise.race([
          axios.get(getDiagnosticSetting, config),
          timeout,
        ]);

        if (response.status === 200) {
          setFormValues({ description: response?.data[0]?.settings?.[detail] || '' });
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching diagnostic settings:', error);
        setLoading(false);
        // Optionally handle the timeout error specifically
        if (error.message === 'Request timed out') {
          console.error('The request took too long and was aborted.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [detail]);

  return (
    <div className="py-[5vh] min-h-[70vh] bg-white-100 border-t-2">
      <section className="max-w-[80%] m-auto h-auto my-40 sm:my-20 2xl:my-0">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div>
              <Spinner/> <span>Loading..</span>
            </div>
          </div>
        ) : (
          <>
             <p className='capitalize font-bold text-orange-300 text-xl mb-8 underline'>{detail}</p>
             <div className="description-container" dangerouslySetInnerHTML={{ __html: formValues.description || 'No description available.' }} />
          </>
        )}
      </section>
    </div>
  );
};

export default InfoPage;
