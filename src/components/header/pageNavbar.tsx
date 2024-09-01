import React from 'react';
import Link from 'next/link';
import { UserButton, useSession } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import LogoComponent from '../common/atoms/logo';

const navLinks = [
  { navLink: '/info/about', navText: 'About Us' },
  { navLink: '/info/faq', navText: 'FAQ' },
  { navLink: '/info/privacy', navText: 'Privacy Policy' },
];

export function Navbar() {
  const { session } = useSession();
  const router = useRouter();

  const handleDashboard = () => {
    router.push('/verifyUser');
  };

  return (
    <div className="navbar-container flex justify-between items-center px-4 py-2 sm:px-6 md:px-8 lg:px-10 xl:px-[10%] xl:py-[1vh]">
      {/* Logo */}
      <LogoComponent />

      {/* Navigation Links */}
      <section className="hidden lg:flex items-center space-x-6">
        {navLinks.map((nav, index) => (
          <Link key={index} href={nav.navLink}>
            <span className="text-base md:text-lg font-medium hover:text-blue-500 transition-colors duration-200">
              {nav.navText}
            </span>
          </Link>
        ))}
      </section>

      {/* User Buttons */}
      <div className="flex items-center space-x-4">
        {session?.status !== 'active' ? (
          <Link href="/signIn">
            <span className="bg-orange-400 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white rounded-md">
              Sign In
            </span>
          </Link>
        ) : (
          <section className="flex gap-3 md:gap-4 items-center">
            <UserButton afterSignOutUrl="/signIn" />
            <button
              onClick={handleDashboard}
              className="bg-violet-900 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white rounded-md"
            >
              Dashboard
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
