import InfoPage from "@components/organism/info";
import { UserLayout } from "@components/templates/pageTemplate";

export default function Terms() {
  return (
    <UserLayout tabDescription="About us page" tabName="Admin Diagnostic | FAQ">
      <InfoPage detail={"TermsOfService"} />
    </UserLayout>
  );
}
