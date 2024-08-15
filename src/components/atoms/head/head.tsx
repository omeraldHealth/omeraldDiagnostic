import Head from "next/head";
import React, { FC } from "react";

interface PageHeadProps {
  title?: string;
  description: string;
  icon?: string;
}

const PageHead: FC<PageHeadProps> = ({ title, description, icon }) => {
  return (
    <Head>
      <title>{title || "Omerald"}</title>
      <meta name="description" content={description} />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta name="theme-color" content="#fff" />
      <link
        rel="icon"
        href={
          icon ||
          "https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"
        }
      />
      <link rel="apple-touch-icon" href="/favicon.png" />
    </Head>
  );
};

export default PageHead;
