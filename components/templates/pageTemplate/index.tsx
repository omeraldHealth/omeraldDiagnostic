import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ROUTES_WITHOUT_SIDEBAR } from 'components/common/constants/constants';
import { Spinner } from '../../atoms/loader';

const PageHead = dynamic(() => import('components/atoms/head/head'));
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res=>res.Navbar),{loading:()=><Spinner/>})
const Footer = dynamic(() => import('@components/molecules/footer').then(res=>res.Footer))

export const UserLayout = ({ tabName, tabDescription, children }: any) => {
  const { pathname } = useRouter();

  return (
    <div className='flex flex-col max-h-[100vh]'>
      <PageHead
        icon={'./favicon.ico'}
        title={tabName}
        description={tabDescription}
      />
      {ROUTES_WITHOUT_SIDEBAR.includes(pathname) ? <Navbar /> : null}
        <main className="flex-grow">
        {children}
        </main>
      {ROUTES_WITHOUT_SIDEBAR.includes(pathname) ? <Footer /> : null}
    </div>
  );
};
