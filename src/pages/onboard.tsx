import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProfileValue } from '@components/common/constants/recoilValues';
import { useUser } from '@clerk/clerk-react';
import { useRecoilValue } from 'recoil';
import { createDC } from '@components/common/recoil/chooseDc';
import { OnboardNavbar } from '@components/molecules/navbar';
import OnboardNewComponents from '@components/molecules/onboard/onboard';
import { Spinner } from '@components/atoms/loader';

const Onboard: React.FC = (): JSX.Element => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const profileValue = useProfileValue();
  const createDcState = useRecoilValue(createDC);

  useEffect(() => {
    if (user && profileValue?._id && createDcState === false) {
      router?.push('/dashboard');
    }
  }, [profileValue, user, router]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <OnboardNavbar />
      <section className="w-[70%] pb-[5vh] my-[7vh] h-auto mx-auto flex flex-col justify-center ">
        {user?.id ? (
          <OnboardNewComponents />
        ) : (
          <p className="font-bold text-xl">
            User not logged in, please login to onboard{' '}
          </p>
        )}
      </section>
      {!isLoaded && <Spinner />}
    </div>
  );
};

export default Onboard;
