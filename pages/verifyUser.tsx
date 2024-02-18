import { useEffect } from 'react'
import { UserLayout } from '@components/templates/pageTemplate'
import { useSession, useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import Router from 'next/router'

export default function VerifyUser() {
  const {session,isLoaded} = useSession();
  const {user} = useUser(); 

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
