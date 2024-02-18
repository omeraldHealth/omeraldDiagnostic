import Head from 'next/head';
import React from 'react';

const PageHead = ({ title, description, icon } : any) => {
  return (
    <Head>
      <title>{title ? title : 'Omerald'}</title>
      <meta name="description" content={description} />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta name="theme-color" content="#fff" />
      <link
        rel="icon"
        href={
          'https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png'
        }
      />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
