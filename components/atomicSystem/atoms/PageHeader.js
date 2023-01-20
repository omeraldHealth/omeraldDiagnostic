import { logoIcon } from "@/components/core/images/image";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PageHeader = () => {

  let [pageTitle,setPageTitle] = useState('Omerald Diagnostic')
  const route = useRouter();

  useEffect(()=>{
    switch(route.pathname){
      case '/':
        setPageTitle('Omerald Diagnostic')
        break;
      case '/onboard':
        setPageTitle('Omerald Diagnostic | Onboard')
        break;
      default:
        setPageTitle('Omerald Diagnostic')
        break;
    }
  },[])


  return (
    <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <link rel="shortcut icon" href={logoIcon} />
  </Head>
  );
};

export default PageHeader;
