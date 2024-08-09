import { useEffect } from 'react';
import { useSession } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile/index';
import { DashboardHeader } from '../../molecules/header';
import { DashboardSideBar } from '@components/molecules/sidebar/index';
import { usePersistedDCState } from '@components/common/recoil/hooks/usePersistedState';
import { useGetDcProfile } from '@utils/reactQuery';
import { Spinner } from '@components/atoms/loader';

/**
 * Layout component for the dashboard.
 * @param {Object} children - The content to be rendered inside the dashboard layout.
 * @returns {JSX.Element} - The rendered dashboard layout component.
 */
export function DashboardLayout({ children }: any) {
  const { session } = useSession();
  const router = useRouter();
  const setProfileRecoil = useSetRecoilState(profileState);
  const [selectedDc, setSelectedDC] = usePersistedDCState();
  const {data: profileData, status, isLoading, refetch} = useGetDcProfile({selectedCenterId: selectedDc})

  useEffect(() => {
    if (session?.status !== 'active') {
      router.push('/signin');
    }
  }, []);

  useEffect(()=>{
    if(!isLoading && status === 'success' && profileData){
      if (!profileData?.data?._id) {
            router.push('/verifyUser');
      }

      else if(profileData?.data?._id){
        setProfileRecoil(profileData?.data)
      }
    }
  },[isLoading, profileData, status])

  useEffect(()=>{refetch()},[])

  return (
    <>
      {isLoading && <Spinner/>}
      <div className="bg-gray-100 w-full min-h-[100vh] h-auto ">
          <DashboardSideBar />
          <div className="xl:pl-64 flex flex-col flex-1">
            {/*@ts-ignore */}
            {profileData?.data && profileData?.data?._id && <DashboardHeader />}
            <main>
              <div className="py-2">
                <div className="max-w-[98vw] mx-4 sm:mx-4 md:max-w-[95vw] m-auto md::max-w-[95%] lg:mx-12 mt-4">
                  <>{children}</>
                  <div className="mt-12 border-t border-gray-200 pt-8 text-center">
                    <p className="text-black text-md">
                      &copy; 2024 <a href="https://omerald.com/" target="_blank" className="text-blue-700">Omerald.com</a>. All rights reserved to Avin Mednologies Private Limited and Omerald.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
      </div>
    </>
  );
}
