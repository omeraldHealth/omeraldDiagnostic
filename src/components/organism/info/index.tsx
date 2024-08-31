import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@components/atoms/loader';
import { getDiagnosticSetting } from '@utils/index';
import { useGetDcProfile, useGetDcSettings } from '@utils/reactQuery';

interface InfoPageProps {
  detail: string;
}

export const InfoPage: React.FC<InfoPageProps> = ({ detail }) => {
  const [formValues, setFormValues] = useState({ description: '' });
  const { data: settingsData, isLoading, refetch } = useGetDcSettings();

  useEffect(() => {
    //@ts-ignore
    if (!isLoading && settingsData?.data) {
      //@ts-ignore
      setFormValues({ description: settingsData?.data?.[0][detail] });
    }
  }, [isLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="py-[5vh] min-h-[70vh] bg-white-100 border-t-2">
      <section className="max-w-[80%] m-auto h-auto my-40 sm:my-20 2xl:my-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div>
              <Spinner /> <span>Loading..</span>
            </div>
          </div>
        ) : (
          <>
            <p className="capitalize font-bold text-orange-300 text-xl mb-8 underline">
              {detail}
            </p>
            <div
              className="description-container"
              dangerouslySetInnerHTML={{
                __html: formValues?.description || 'No description available.',
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default InfoPage;
