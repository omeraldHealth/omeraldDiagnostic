import { Fragment, useEffect } from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useAuthContext } from 'utils/context/auth.context'

const OnboardComponents = dynamic(() => import('@components/molecules/onboard'),{loading: () => <Spinner/>})
const Head = dynamic(() => import('@components/atoms/head/head'))
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res=>res.Navbar),{loading:()=><Spinner/>})
const Footer = dynamic(() => import('@components/molecules/footer').then(res=>res.Footer))

function Onboard() {

  const router = useRouter()
  const {diagnosticDetails} = useAuthContext()

  useEffect(()=>{
    if(diagnosticDetails){
      router?.push("/dashboard")
    }
  },[diagnosticDetails])

  return (
    // <Fragment>
	  //   <Head title={'Omerald Diagnostic | Onboard'} />
    //         <div>
    //             <Navbar/>
    //                 <section className='min-h-[80vh]'>
    //                   <OnboardComponents/>
    //                 </section>
    //             <Footer />
    //         </div>
	  // </Fragment>
    <p>Onboarding</p>
  )
}

export default Onboard;