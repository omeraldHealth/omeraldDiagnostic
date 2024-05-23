import React, { useEffect } from 'react';
import Link from 'next/link';
import { UserButton, useSession, useUser } from '@clerk/clerk-react';
import { Logo } from '@components/atoms/nav/logo';
import NavFont from '@components/atoms/nav/navFont';
import { useAuthContext } from 'utils/context/auth.context';
import { successAlert } from '@components/atoms/alerts/alert';
import { useRouter } from 'next/router';
import { profileState } from '@components/common/recoil/profile';
import { useSetRecoilState } from 'recoil';

const navLinks = [
  { navLink: '/info/features', navText: 'Features' },
  { navLink: '/info/knowledge', navText: 'Knowledge' },
  { navLink: '/info/blog', navText: 'Blog' },
  { navLink: '/info/pricing', navText: 'Pricing' },
];

interface NavbarProps {
  // Add any additional props if needed
}

export function Navbar({}: NavbarProps) {
  const { diagnosticDetails } = useAuthContext();
  const { session } = useSession();
  const setDiagnosticCenter = useSetRecoilState(profileState);
  const { user } = useUser();
  const router = useRouter();
  const logo = "https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png";
  const localProfile = JSON.parse(localStorage.getItem('diagnosticCenter'));

  const handleDashboard = () => {
    if (localProfile && localProfile._id) {
      setDiagnosticCenter(localProfile);
      successAlert("Login to " + localProfile.centerName);
      router.push("/dashboard");
    } else {
      router.push("/verifyUser");
    }
  };

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
            <button onClick={handleDashboard} className="bg-violet-900 px-4 py-2 text-white rounded-md">Dashboard</button>
          </section>
        )}
      </div>
    </div>
  );
}
