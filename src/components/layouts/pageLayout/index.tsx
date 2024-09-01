import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ComponentLoader } from '@/components/common/componentLoader';
import { logoIcon } from '@/utils/constants/cloudinary';
import { ROUTES_WITHOUT_SIDEBAR } from '@/utils/paths';
import { PageLayoutProps } from '@/utils/interface/ui';

// Dynamic imports with loading spinner
const Navbar = dynamic(
  () => import('@/components/header/pageNavbar').then((res) => res.Navbar),
  { loading: () => <ComponentLoader /> },
);
const Footer = dynamic(
  () => import('@/components/footer/index').then((res) => res.Footer),
  { loading: () => <ComponentLoader /> },
);


export const PageLayout: React.FC<PageLayoutProps> = ({
  tabName,
  tabDescription,
  children,
  showNavbar = true,
  showFooter = true,
}) => {
  const { pathname } = useRouter();

  const shouldShowNavbar = showNavbar && ROUTES_WITHOUT_SIDEBAR.includes(pathname);
  const shouldShowFooter = showFooter && ROUTES_WITHOUT_SIDEBAR.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{tabName}</title>
        <meta name="description" content={tabDescription} />
        <link rel="icon" href={logoIcon} />
      </Head>

      {shouldShowNavbar && (
        <header className="bg-white shadow-md">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
          </div>
        </header>
      )}

      <main className="flex-grow flex flex-col justify-center items-center bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {shouldShowFooter && (
        <footer className="bg-white mt-8">
            <Footer />
        </footer>
      )}
    </div>
  );
};
