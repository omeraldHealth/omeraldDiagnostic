import { DashboardHeader } from "@components/molecules/header";
import { Sidebar } from "@components/molecules/sidebar";
import { Fragment, ReactElement, useEffect, useState } from "react";


export default function DashboardLayout({children}: {children: ReactElement}) {

  const [showSidebar,setSidebarOpen] = useState(false)

  return (
    <Fragment >
        <aside className="w-64 xl:flex hidden">
          <Sidebar/>
        </aside>
        {showSidebar && <>
         <div className="relative h-[100vh] z-50" id="sideContainer">
           <section className="fixed  h-[100vh] top-0 left-0">
            <Sidebar showSidebar={showSidebar} setSidebarOpen={setSidebarOpen}/>
           </section>
         </div>
         </>
        }
        <main className="w-[100%]">
          <DashboardHeader showSidebar={showSidebar} setSidebarOpen={setSidebarOpen}/>
          {children}
        </main>
    </Fragment>
  )
}
