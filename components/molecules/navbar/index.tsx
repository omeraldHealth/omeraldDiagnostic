import React from 'react';
import Link from 'next/link';
import { UserButton, useSession, useUser } from '@clerk/clerk-react';
import { Logo } from '@components/atoms/nav/logo';
import NavFont from '@components/atoms/nav/navFont';
import { useAuthContext } from 'utils/context/auth.context';

const navLinks = [
  { navLink: '/feature', navText: 'Features' },
  { navLink: '/knowledge', navText: 'Knowledge' },
  { navLink: '/blog', navText: 'Blog' },
  { navLink: '/pricing', navText: 'Pricing' },
];

interface NavbarProps {
  // Add any additional props if needed
}

export function Navbar({}: NavbarProps) {
  const { diagnosticDetails } = useAuthContext();
  const { session } = useSession();
  const { user } = useUser();
  const logo = "https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png";

  return (
    <div className="navbar-container flex justify-between items-center px-[4%] xl:px-[10%]">
      <Link href="/">
        <span className="flex">
          <Logo src={logo} alt="Omerald Diagnostics Logo" />
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
            <UserButton afterSignOutUrl="/" />
            <Link href="/verifyUser" className="mx-2">
              <button className="bg-violet-900 px-4 py-2 text-white rounded-md">Dashboard</button>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
