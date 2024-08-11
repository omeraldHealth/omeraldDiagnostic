import React from 'react';
import { CommonSettingTable } from '../utils/table';
import { ADMIN_USER_ACTIVITES_COLUMNS } from '../utils/tabs';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';

export const Activity = () => {
  const currentBranch = useCurrentBranchValue()
  // @ts-ignore
  const activities = currentBranch && currentBranch?.activities;
  return (
    <div className='sdsa'>
        <CommonSettingTable data={activities} columns={ADMIN_USER_ACTIVITES_COLUMNS}/>
    </div>
  );
};
