import InfoPage from '@components/organism/info';
import { UserLayout } from '@components/templates/pageTemplate';

export default function Disclaimer() {
  return (
    <UserLayout
      tabDescription="Disclaimer us page"
      tabName="Admin Diagnostic | Disclaimer"
    >
      <InfoPage detail={'Disclaimer'} />
    </UserLayout>
  );
}
