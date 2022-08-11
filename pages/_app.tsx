import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";
import { NextComponentType, NextPage } from "next";
import Layout from "@/components/Layout/Layout.component";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { ReactElement, ReactNode } from "react";
import Allowed from "hocs/Allowed";

// export type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
// };

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

function MyApp({ Component, pageProps }: AppProps) {
  // const getLayout = <Layout>{Component.getLayout}</Layout> ?? ((page) => page);
  // return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
  return (
    <AuthProvider>
      <Allowed>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Allowed>
    </AuthProvider>
  );
}

export default MyApp;
