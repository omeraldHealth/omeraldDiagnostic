import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from 'utils/context/auth.context'
import { UserLayout } from '../components/templates/pageTemplate'
import dynamic from 'next/dynamic'

const OnboardComponents = dynamic(() => import('@components/molecules/onboard'),{ssr:false})

function Onboard() {

  const router = useRouter()
  const {diagnosticDetails} = useAuthContext()

  useEffect(()=>{
    if(diagnosticDetails){
      router?.push("/dashboard")
    }
  },[diagnosticDetails])

  return (
    <UserLayout tabName="Admin Omerald | Verify User">
    <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <OnboardComponents/>
    </div>
  </UserLayout>
  )
}

export default Onboard;