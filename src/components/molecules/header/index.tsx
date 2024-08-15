import React from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useDashboardTabs } from "@components/common/constants/recoilValues";
import { UserButton } from "@clerk/clerk-react";
import SelectDC from "./selectDc";
import { BranchSelection } from "./branchSelection";

export function DashboardHeader() {
  const tabName = useDashboardTabs();
  return (
    <div className={`flex justify-between items-center`}>
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <p className="flex sm:font-bold text-md sm:text-lg self-center">
                <Bars3Icon className="w-6 mr-1 sm:mx-4" />
                {tabName}
              </p>
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <section className="flex gap-1">
                <BranchSelection />
                <section className="flex gap-4 items-center mx-4">
                  <UserButton afterSignOutUrl="/signIn" />
                  <SelectDC />
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
