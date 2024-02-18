import { useEffect } from 'react'
import { UserLayout } from '@components/templates/pageTemplate'
import { useSession, useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { getDiagProfileByPhoneApi } from '../utils';
import { errorAlert, successAlert } from '../components/atoms/alerts/alert';

export default function VerifyUser() {
  const {session,isLoaded} = useSession();
  const {user} = useUser(); 
  const router = useRouter(); 

  useEffect(()=>{
    if (isLoaded && session?.status !==  'active') {
      router.push('/signIn');
    }else if(session?.status == "active" && user){
      fetchProfile(user)
      // setProfile(user)
    }
  },[user, session])

  const fetchProfile = async (user:any) => {
    try {
      const {data,status} = await axios.get(getDiagProfileByPhoneApi+user?.phoneNumbers[0]?.phoneNumber+1)
      if(status === 200) {
        if(data){
          successAlert("Profile fetched succesfully")
          router.push("/dashboard")
        }
      }
    } catch (error) {
      errorAlert("Profile not found")
      router.push("/onboard")
    }
  }

  return (
     <UserLayout tabName="Admin Omerald | Verify User">
     <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
       <section className="my-10">
       <div className="bg-container w-[75vw] m-auto">
          <img src='/verifyProfile.gif' />
        </div>
       </section>
     </div>
   </UserLayout>
  )
}
