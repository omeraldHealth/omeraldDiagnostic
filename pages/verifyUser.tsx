import { Fragment, useEffect } from 'react'
import { PageTemplate } from '@components/templates/pageTemplate'
import dynamic from 'next/dynamic'
import styles from "styles/signIn.module.css"
import { Spinner } from '@components/atoms/loader'
import { useSession, useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { warningAlert } from '@components/atoms/alerts/alert'
import toast from 'react-hot-toast';
import axios from 'axios'
import { getDiagnosticUserApi } from '@utils'

const Head = dynamic(() => import('@components/atoms/head/head'),{loading: () => <Spinner/>})
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res=>res.Navbar),{loading:()=><Spinner/>})

export default function VerifyUser() {
  const {session,isLoaded} = useSession();
  const {user} = useUser();
  const router = useRouter();

  useEffect(()=>{
    if (isLoaded && session?.status !== 'active') {
      warningAlert("User not signed in")
      router.push('/signin');
    }else if(session?.status == "active" && user){
      fetchProfile(user)
      // setProfile(user)
    }
  },[user, session])

  const fetchProfile = async (user: any) => {
    try {
      const {data,status} = await axios.get(getDiagnosticUserApi+user?.phoneNumbers[0]?.phoneNumber)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Verify User'} />
      <PageTemplate>
            <div className={`max-h-[100vh] ${styles["signInContainer"]}`}>
                <Navbar/>
                <div className="bg-container w-[75vw] m-auto">
                    <img src='/verifyProfile.gif' />
                </div>
            </div>
        </PageTemplate>
	  </Fragment>
  )
}
