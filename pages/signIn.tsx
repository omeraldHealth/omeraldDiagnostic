import { Fragment, useEffect } from 'react'
import { useAuthContext } from 'utils/context/auth.context'
import { useRouter } from 'next/router'
import { PageTemplate } from '@components/templates/pageTemplate'
import dynamic from 'next/dynamic'
import styles from "styles/signIn.module.css"
import { Spinner } from '@components/atoms/loader'

const Head = dynamic(() => import('@components/atoms/head/head'),{loading: () => <Spinner/>})
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res=>res.Navbar),{loading:()=><Spinner/>})
const SignInComponent = dynamic(() => import('@components/molecules/signIn'),{loading: () => <Spinner/>})

export default function Home() {

  const {user,diagnosticDetails} = useAuthContext()
  const router = useRouter()

  useEffect(()=>{
    if(user && diagnosticDetails?.phoneNumber){
      router.push("/dashboard")
    }else if(user && diagnosticDetails==null){
      router.push("/onboard")
    }
  },[])

  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Sign In'} />
      <PageTemplate>
            <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
                <Navbar/>
                  <section className='min-h-[70vh]'>
                    <SignInComponent/>
                  </section>
            </div>
        </PageTemplate>
	  </Fragment>
  )
}
