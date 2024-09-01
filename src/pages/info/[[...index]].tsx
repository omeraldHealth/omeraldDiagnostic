import { PageLayout } from '@/components/layouts/pageLayout';
import { useGetDCInfo } from '@/utils/query/getQueries';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { routeToKeyMapper } from '@/utils/paths';
import { PageLoader } from '@/components/common/pageLoader';

const InfoPage = () => {
  const router = useRouter();
  const pathKey = router.asPath.split('/').pop()?.toLowerCase(); // Extract the last part of the path and convert to lowercase
  const { data: infoData, isLoading, error } = useGetDCInfo({});
  const contentKey = pathKey ? routeToKeyMapper[pathKey] : undefined;
  const content = contentKey
    ? infoData?.data?.[0]?.[contentKey]
    : 'No Data Available';

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <PageLayout tabDescription="Error" tabName="Diagnostic Omerald | Error">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Error Loading Data
          </h1>
          <p className="text-lg text-gray-700">
            There was an error fetching the data. Please try again later.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      tabDescription={`Information about ${pathKey}`}
      tabName={`Diagnostic Omerald | ${pathKey}`}
    >
      <div
        className="relative h-[60vh]"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/drjut62wv/image/upload/v1725204726/omerald/diagnosticCenter/Company_Website_Generic_1_safbnp.png')`,
          backgroundPosition: 'center -100px', // Move the image up by 20px
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-4xl font-extrabold text-white capitalize">
            {pathKey}
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <div className="prose prose-lg max-w-none bg-white p-8 shadow-lg rounded-lg">
          <div
            dangerouslySetInnerHTML={{ __html: content || 'No Data Available' }}
          ></div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InfoPage;
