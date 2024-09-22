import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/clerk-react';
import { useRecoilValue } from 'recoil';
import { useDCProfileValue } from '@/utils/recoil/values';
import { createDC } from '@/utils/recoil';
import { PageLoader } from '@/components/common/pageLoader';
import { OnboardNavbar } from '@/components/header/onboardNavbar';
import { Footer } from '@/components/footer';
import OnboardNewComponents from '@/components/onboard';

const Onboard: React.FC = (): JSX.Element => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const profileValue = useDCProfileValue();
  const createDcState = useRecoilValue(createDC);

  useEffect(() => {
    if (user && profileValue?._id && !createDcState) {
      router.push('/dashboard');
    }
  }, [profileValue, user, router, createDcState]);

  if (!isLoaded) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <OnboardNavbar />
      <section className="w-[70%] pb-[5vh] my-[7vh] h-auto mx-auto flex flex-col justify-center">
        {user?.id ? (
          <section className="min-h-[40vh]">
            <OnboardNewComponents />
          </section>
        ) : (
          <p className="font-bold text-xl">
            User not logged in, please login to onboard
          </p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Onboard;
