import { PageLoader } from '@/components/common/pageLoader';
import { DashboardSideBar } from '@/components/common/sidebar';
import { DashboardHeader } from '@/components/header/dashNavbar';
import { usePersistedBranchState, usePersistedDCState } from '@/hooks/localstorage';
import { logoIcon } from '@/utils/constants/cloudinary';
import { useGetDcBranch, useGetDcProfile } from '@/utils/query/getQueries';
import { branchState, profileState } from '@/utils/recoil';
import { useUserRecoilValue } from '@/utils/recoil/values';
import { useSession } from '@clerk/nextjs';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

/**
 * Layout component for the dashboard.
 * @param {Object} children - The content to be rendered inside the dashboard layout.
 * @returns {JSX.Element} - The rendered dashboard layout component.
 */
export function DashboardLayout({
  tabName,
  tabDescription,
  children,
}: any) {
  const { session } = useSession();
  const [selectedDc] = usePersistedDCState();
  const [selectedBranch] = usePersistedBranchState();
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useGetDcProfile({ selectedCenterId: selectedDc });
  const {
    data: currentBranch,
    isLoading: branchLoading,
    refetch: refBranch,
  } = useGetDcBranch({ selectedBranchId: selectedBranch });

  const router = useRouter();
  const setProfileRecoil = useSetRecoilState(profileState);
  const setCurrentBranch = useSetRecoilState(branchState);
  const user = useUserRecoilValue()

  useEffect(() => { 
    if (user?.phoneNumber == "") { 
      router.push("/verifyUser")
    }
  },[user])

  useEffect(() => {
    if (session?.status !== 'active') {
      router.push('/signin');
    }
  }, []);

  useEffect(() => {
    if (!isLoading && profileData) {
      //@ts-ignore
      if (profileData?.data) {
        //@ts-ignore
        setProfileRecoil(profileData?.data);
      }
    }
  }, [isLoading, profileData]);

  useEffect(() => {
    if (!branchLoading && currentBranch) {
      //@ts-ignore
      if (currentBranch?.data) {
        //@ts-ignore
        setCurrentBranch(currentBranch?.data);
      }
    }
  }, [branchLoading, currentBranch]);

  useEffect(() => {
    if (selectedDc) {
      refetch();
    }
  }, [selectedDc]);

  useEffect(() => {
    if (selectedBranch) {
      refBranch();
    }
  }, [selectedBranch]);

  //@ts-ignore
  const isValidProfile = profileData?.data?._id;

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="bg-gray-100 w-full min-h-[100vh] h-auto ">
      <Head>
        <title>{tabName}</title>
        <meta name="description" content={tabDescription} />
        <link rel="icon" href={logoIcon} />
      </Head>
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
                    &copy; 2024{' '}
                    <a
                      href="https://omerald.com/"
                      target="_blank"
                      className="text-blue-700"
                      rel="noreferrer"
                    >
                      Omerald.com
                    </a>
                    . All rights reserved to Avin Mednologies Private Limited
                    and Omerald.
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
