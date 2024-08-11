
import { Spinner } from '@components/atoms/loader';
import SettingsTabLayout from '@components/organism/dashboardTabs/settingsLayout';
import {UserLayout} from '@components/templates/pageTemplate';
import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('@components/organism/landing/landingPage'), { loading: ()=><Spinner /> });

export default function Home() {
  return (
    <UserLayout tabDescription='Home page' tabName="Diagnostic Omerald | Home">
      <div >
        {/* <LandingPage /> */}
        <SettingsTabLayout />
      </div>
    </UserLayout>
  );
}
