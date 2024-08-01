import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProfileValue } from '@components/common/constants/recoilValues';
import { UserButton, useUser } from '@clerk/clerk-react';
import PageHead from '@components/atoms/head/head';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import OnboardNewComponents from '@components/molecules/onboard/onboard';

const Onboard: React.FC = (): JSX.Element => {
  const { user } = useUser();
  const router = useRouter();
  const profileValue = useProfileValue();
  let createDc = localStorage.getItem("createDC")

  useEffect(() => {
    if (user && profileValue?._id && createDc === "false") {
      router?.push('/dashboard');
    }
  }, [profileValue, user, router]);

  return (
      <div className='flex flex-col h-screen bg-white'>
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
           <span className='mx-4'><UserButton afterSignOutUrl="/" /></span>
          </section>
        </section>
        <section className='w-[70%] pb-[5vh] my-[7vh] h-auto mx-auto flex flex-col justify-center '>
          {user?.id ? <OnboardNewComponents/>: <p className='font-bold text-xl'>User not logged in, please login to onboard </p>}
        </section>
      </div>
  );
};

export default Onboard;
