import { useEffect } from 'react';
import { useSession } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile/index';
import { DashboardHeader } from '../../molecules/header';
import { DashboardSideBar } from '@components/molecules/sidebar/index';
import { usePersistedBranchState, usePersistedDCState } from '@components/common/recoil/hooks/usePersistedState';
import { useGetDcProfile } from '@utils/reactQuery';
import { Spinner } from '@components/atoms/loader';
import { branchState } from '@components/common/recoil/branch/branch';

/**
 * Layout component for the dashboard.
 * @param {Object} children - The content to be rendered inside the dashboard layout.
 * @returns {JSX.Element} - The rendered dashboard layout component.
 */
export function DashboardLayout({ children }: any) {
  const { session } = useSession();
  const [ selectedDc ] = usePersistedDCState();
  const [ selectedBranch ] = usePersistedBranchState();
  const {data: profileData, isLoading, refetch} = useGetDcProfile({selectedCenterId: selectedDc})
  const router = useRouter();
  const setProfileRecoil = useSetRecoilState(profileState);
  const setCurrentBranch = useSetRecoilState(branchState);

  useEffect(() => {
    if (session?.status !== 'active') {
      router.push('/signin');
    }
  }, []);

  useEffect(()=>{
    if(!isLoading && profileData){
      //@ts-ignore
      if(profileData?.data){
        //@ts-ignore
        setProfileRecoil(profileData?.data)
      }
    }
  },[isLoading, profileData])

  useEffect(()=>{
    if(selectedDc){
      refetch()
    }
  },[selectedDc])

  useEffect(()=>{
    if(selectedBranch){
      // @ts-ignore
      const branch = profileData?.data?.branches.find((branch: any)=> branch._id === selectedBranch)
      if(branch){
        setCurrentBranch(branch)
      }
    }
  },[])

  //@ts-ignore
  const isValidProfile = profileData?.data?._id

  return (
    <>
      {isLoading && <Spinner/>}
      <div className="bg-gray-100 w-full min-h-[100vh] h-auto ">
          <DashboardSideBar />
          <div className="xl:pl-64 flex flex-col flex-1">
            {/*@ts-ignore */}
            {isValidProfile && <DashboardHeader />}
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
