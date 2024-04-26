
import { Spinner } from '@components/atoms/loader';
import {UserLayout} from '@components/templates/pageTemplate';
import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('@components/organism/landing/landingPage'), { loading: ()=><Spinner /> });

export default function Home() {
  return (
    <UserLayout tabName="Admin Omerald | Home">
      <LandingPage />
    </UserLayout>
  );
}
