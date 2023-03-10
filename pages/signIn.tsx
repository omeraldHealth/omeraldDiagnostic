import { Fragment, useEffect } from 'react'
import { useAuthContext } from 'utils/context/auth.context'
import { useRouter } from 'next/router'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import('@components/organism/signIn/index'),{loading: () => <Spinner/>})
const Head = dynamic(() => import('@components/atoms/head/head'))

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
      <SignIn/>
	  </Fragment>
  )
}
