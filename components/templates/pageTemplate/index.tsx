import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ROUTES_WITHOUT_SIDEBAR } from 'components/common/constants/recoilValues';
import { Spinner } from '../../atoms/loader';

// Dynamic imports with loading spinner
const PageHead = dynamic(() => import('components/atoms/head/head'),{ loading: () => <Spinner />});
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res => res.Navbar), { loading: () => <Spinner /> });
const Footer = dynamic(() => import('@components/common/footer').then(res => res.Footer),{ loading: () => <Spinner />});

/**
 * UserLayout component for pages with or without sidebar.
 * @param {string} tabName - The name of the tab.
 * @param {string} tabDescription - The description of the tab.
 * @param {ReactNode} children - The content to be rendered inside the layout.
 */
export const UserLayout = ({ tabName, tabDescription, children }: any) => {
  const { pathname } = useRouter();

  return (
    <div className='flex flex-col max-h-[100vh]'>
      {/* Head component for SEO metadata */}
      <PageHead
        icon={'./favicon.ico'}
        title={tabName}
        description={tabDescription}
      />

      {/* Display Navbar only for routes without sidebar */}
      {ROUTES_WITHOUT_SIDEBAR.includes(pathname) ? <Navbar /> : null}

      {/* Main content area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Display Footer only for routes without sidebar */}
      {ROUTES_WITHOUT_SIDEBAR.includes(pathname) ? <Footer /> : null}
    </div>
  );
};

