import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Select } from 'antd';
import { useSetRecoilState } from 'recoil';
import { useDashboardTabs, useProfileValue } from '@components/common/constants/recoilValues';
import { branchState } from '@components/common/recoil/branch/branch';
import { Loader } from '@components/atoms/loader/loader';
import { warningAlert } from '@components/atoms/alerts/alert';
import { SignOutButton, UserButton } from '@clerk/clerk-react';
import SelectDC from './selectDc';
interface DashboardHeaderProps {
  // Add any additional props if needed
}

export function DashboardHeader({}: DashboardHeaderProps) {
  const tabName = useDashboardTabs();
  const profile = useProfileValue();
  const setCurrentBranch = useSetRecoilState(branchState);
  const selectedBranch = JSON.parse(localStorage.getItem('selectedBranch') || '{}');
  const [loading, setLoading] = useState(false)
  const branchList = profile && profile?.branches;

  const handleBranchChange = (value: any) => {
    setLoading(true)

    setTimeout(()=>{
      let branch = branchList?.filter((branch: any) => branch?._id === value)[0];
      setCurrentBranch(branch);
      localStorage.setItem('selectedBranch',JSON.stringify(branch))
      warningAlert("Switched to "+selectedBranch?.branchName)
      setLoading(false)

    }, 1000)
  };



  return (
    <div className={`flex justify-between items-center`}>
      {loading && <Loader/>}
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <p className='flex sm:font-bold text-md sm:text-lg self-center'>
                <Bars3Icon className='w-6 mr-1 sm:mx-4' />
                {tabName}
              </p>
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <section className='flex gap-1'>
                <Select
                  placeholder="Select Branch"
                  value={{ label: selectedBranch?.branchName, value: selectedBranch }}
                  onChange={handleBranchChange}
                  options={branchList?.map((branch: any) => ({ label: branch?.branchName, value: branch?._id, key: branch?.branchName }))}
                />
                 <section className="flex gap-4 items-center mx-4">
                    <UserButton afterSignOutUrl="/signIn" />
                    <SelectDC/>
                  </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
