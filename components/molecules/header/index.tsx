import React from 'react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Select } from 'antd';
import { useSetRecoilState } from 'recoil';
import { useCurrentBranchValue, useDashboardTabs, useProfileValue } from '@components/common/constants/recoilValues';
import { branchState } from '@components/common/recoil/branch/branch';

interface DashboardHeaderProps {
  // Add any additional props if needed
}

export function DashboardHeader({}: DashboardHeaderProps) {
  const tabName = useDashboardTabs();
  const profile = useProfileValue();
  const currentBranch = useCurrentBranchValue();
  const setCurrentBranch = useSetRecoilState(branchState);

  // @ts-ignore
  const branchList = profile && profile?.branchDetails;

  const handleBranchChange = (value: any) => {
    let branch = branchList?.filter((branch: any) => branch?._id === value)[0];
    setCurrentBranch(branch);
  };

  return (
    <div className={`flex justify-between items-center`}>
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
                  value={{ label: currentBranch?.branchName, value: currentBranch }}
                  onChange={handleBranchChange}
                  options={branchList?.map((branch: any) => ({ label: branch?.branchName, value: branch?._id, key: branch?.branchName }))}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
