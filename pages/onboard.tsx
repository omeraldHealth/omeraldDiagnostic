import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserLayout } from '../components/templates/pageTemplate';
import { useProfileValue } from '@components/common/constants/recoilValues';
import { useUser } from '@clerk/clerk-react';
import { Spinner } from '@components/atoms/loader';
import dynamic from 'next/dynamic';

// Dynamically load OnboardComponents with a loading spinner
const OnboardComponents = dynamic(() => import('@components/molecules/onboard'), { loading: () => <Spinner /> });

/**
 * Onboard page component.
 * Redirects to the dashboard if the user and profileValue exist.
 */
const Onboard: React.FC = (): JSX.Element => {
  const { user } = useUser();
  const router = useRouter();
  const profileValue = useProfileValue();

  useEffect(() => {
    // Redirect to dashboard if user and profileValue exist
    if (user && profileValue?._id) {
      router?.push('/dashboard');
    }
  }, [profileValue, user, router]);

  return (
    <UserLayout tabName="Admin Omerald | Verify User">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <OnboardComponents />
      </div>
    </UserLayout>
  );
};

export default Onboard;
