import { useEffect, useRef } from 'react';
import { useSession} from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { profileState } from "components/common/recoil/profile/index"
import { DashboardHeader } from '../../molecules/header';

export function DashboardLayout({ children }:any) {
  const { session } = useSession();
  const profile = useRecoilValue(profileState);
  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(()=>{
    if(session?.status != "active"){
      router.push("/signin")
    } 
  },[])

  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if(!profile?._id){
      router.push("/verifyUser")
    }
  },[profile])

  return (
    <>
      {session?.status === 'active' && (
        <div className="bg-gray-100 w-full min-h-[100vh] h-auto ">
          {/* <DashboardSideBar />   */}
          <div className="xl:pl-64 flex flex-col flex-1">
          {(profile && profile?._id) && <DashboardHeader />}
            <main>
              <div className="py-6">
                <div className="max-w-[98vw] mx-4 sm:mx-4 md:max-w-[95vw] m-auto md::max-w-[95%] lg:mx-12 mt-4">
                    <>{children}</>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
