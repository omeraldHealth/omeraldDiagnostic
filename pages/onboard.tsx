import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserLayout } from '../components/templates/pageTemplate';
import { useProfileValue } from '@components/common/constants/constants';
import { useUser } from '@clerk/clerk-react';
import dynamic from 'next/dynamic';

const OnboardComponents = dynamic(() => import('@components/molecules/onboard'), { ssr: false });

function Onboard() {
  const { user } = useUser();
  const router = useRouter();
  const profileValue = useProfileValue();

  useEffect(() => {
    // @ts-ignore
    const shouldRedirect = user && profileValue?._id;
    if (shouldRedirect) {
      router?.push('/dashboard');
    }
  }, [profileValue, user]);

  return (
    <UserLayout tabName="Admin Omerald | Verify User">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <OnboardComponents />
      </div>
    </UserLayout>
  );
}

export default Onboard;
