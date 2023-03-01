import { DashboardHeader } from "@components/molecules/header";
import { Sidebar } from "@components/molecules/sidebar";

export const DashboardTemplate = () => {

  return (
    <div className="w-{100vw} h-[100vh] flex justify-start bg-gray-100">
        <aside className="w-64">
          <Sidebar/>
        </aside>
        <main className="w-[100%]">
          <DashboardHeader/>
        </main>
    </div>
  )
};;


