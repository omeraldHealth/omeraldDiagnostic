import InfoPage from '@components/organism/info';
import { UserLayout } from '@components/templates/pageTemplate';

export default function Consent() {
  return (
    <UserLayout
      tabDescription="About us page"
      tabName="Admin Diagnostic | Privacy"
    >
      <InfoPage detail={'PlatformConsent'} />
    </UserLayout>
  );
}
