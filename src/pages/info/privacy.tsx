import InfoPage from '@components/organism/info'
import { UserLayout } from '@components/templates/pageTemplate'

export default function PrivacyPolicy() {
  return (
    <UserLayout tabDescription='About us page' tabName="Admin Diagnostic | Privacy">
          <InfoPage detail={"PrivacyPolicy"} />
    </UserLayout>
  )
}
