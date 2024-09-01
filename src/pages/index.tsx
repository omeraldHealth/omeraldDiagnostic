import { PageLayout } from "@/components/layouts/pageLayout";
import dynamic from "next/dynamic";

// const LandingPage = dynamic(
//   () => import(),
//   { loading: () => <PageLoader /> },
// );

export default function Home() {
  return (
    <PageLayout tabDescription="Home page" tabName="Diagnostic Omerald | Home">
      <></>
    </PageLayout>
  );
}