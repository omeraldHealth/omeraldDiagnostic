import dynamic from 'next/dynamic'
import { UserLayout } from '../components/templates/pageTemplate'
 
const LandingPage = dynamic(() => import('@components/organism/landing/landingPage'),{ ssr: false })

export default function Home() {

  return (
    <UserLayout tabName="Admin Omerald | Home">
      <LandingPage />
    </UserLayout>
  )
}
