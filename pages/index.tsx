import { UserLayout } from '../components/templates/pageTemplate';
import { LoadableComponent } from 'utils/common/loadbale';

// Dynamic import for LandingPage component with SSR disabled
const LandingPage = LoadableComponent(() => import('@components/organism/landing/landingPage'));

// Home component displaying the LandingPage
export default function Home() {
  return (
    <UserLayout tabName="Admin Omerald | Home">
      {/* Render the LandingPage component */}
      <LandingPage />
    </UserLayout>
  );
}
