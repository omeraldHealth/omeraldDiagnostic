
import { Spinner } from '@components/atoms/loader';
import {UserLayout} from '@components/templates/pageTemplate';
import dynamic from 'next/dynamic';

// Dynamic import for LandingPage component with SSR disabled
const LandingPage = dynamic(() => import('@components/organism/landing/landingPage'), { loading: ()=><Spinner /> });

// Home component displaying the LandingPage
export default function Home() {
  return (
    <UserLayout tabName="Admin Omerald | Home">
      {/* Render the LandingPage component */}
      <LandingPage />
    </UserLayout>
  );
}
