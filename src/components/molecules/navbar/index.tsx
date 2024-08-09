import React from 'react';
import Link from 'next/link';
import { UserButton, useSession } from '@clerk/clerk-react';
import { Logo } from '@components/atoms/nav/logo';
import { useRouter } from 'next/router';
import NavFont from '@components/atoms/nav/navFont';
import { logoUrl } from '@utils/constants';

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
