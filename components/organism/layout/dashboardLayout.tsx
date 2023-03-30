import { DashboardHeader } from "@components/molecules/header";
import { Sidebar } from "@components/molecules/sidebar";
import { Fragment, ReactElement } from "react";


export default function DashboardLayout({children}: {children: ReactElement}) {
  return (
    <Fragment>
        <aside className="xl:w-80">
          <Sidebar/>
        </aside>
        <main className="w-[110%]">
          <DashboardHeader/>
          {children}
        </main>
    </Fragment>
   
  )
}
