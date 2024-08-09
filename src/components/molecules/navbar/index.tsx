import React from 'react';
import Link from 'next/link';
import { UserButton, useSession } from '@clerk/clerk-react';
import { Logo } from '@components/atoms/nav/logo';
import { useRouter } from 'next/router';
import NavFont from '@components/atoms/nav/navFont';
import { logoUrl } from '@utils/constants';
import PageHead from '@components/atoms/head/head';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

const navLinks = [
  { navLink: '/info/about', navText: 'About Us' },
  { navLink: '/info/faq', navText: 'FAQ' },
  { navLink: '/info/privacy', navText: 'Privacy Policy' },
];

export function Navbar() {
  const { session } = useSession();
  const router = useRouter();

  const handleDashboard = () => {
      router.push("/verifyUser");
  };

  return (
    <div className="navbar-container flex justify-between items-center px-[4%] xl:px-[10%]">
      <Link href="/">
        <span className="flex">
        <Logo src={logoUrl} alt="Omerald Diagnostics Logo" />
          <p className="font-sans hidden sm:block sm:text-lg sm:font-bold self-center">OMERALD DIAGNOSTICS</p>
        </span>
      </Link>
      <section className="hidden xl:flex">
        {navLinks.map((nav, index) => (
          <Link key={index} href={nav.navLink}>
            <NavFont>{nav.navText}</NavFont>
          </Link>
        ))}
      </section>
      <div>
        {session?.status !== 'active' ? (
          <Link href="/signIn">
            <button className="bg-orange-400 px-4 py-2 text-white rounded-md">Sign In</button>
          </Link>
        ) : (
          <section className="flex gap-4 items-center">
            <UserButton afterSignOutUrl="/signIn" />
            <button onClick={handleDashboard} className="bg-violet-900 px-4 py-2 text-white rounded-md">Dashboard</button>
          </section>
        )}
      </div>
    </div>
  );
}

export const OnboardNavbar = () => {
  return <>
      <PageHead
        icon={'./favicon.png'}
        title={"Onboard"}
        description={"Onboarding Page"}
      />
      <section className='py-4 flex justify-between w-full px-[10vw] items-center border-b-2 border-gray-200'>
      <Link href="/">
      <span className="flex">
        <p className="font-sans hidden sm:block sm:text-lg sm:font-bold self-center">OMERALD DIAGNOSTICS</p>
      </span>
      </Link>
      <section className="flex justify-center items-center h-full ">
      <p className='text-lg flex'><InformationCircleIcon className='w-[30px] text-blue-700 mx-2'/> Diagnostic Details</p>
      <span className='mx-4'><UserButton afterSignOutUrl="/signIn" /></span>
      </section>
      </section>
  </>
}

