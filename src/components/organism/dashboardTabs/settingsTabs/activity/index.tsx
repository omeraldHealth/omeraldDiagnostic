import React from 'react';
import { CommonSettingTable } from '../utils/table';
import { ADMIN_USER_ACTIVITES_COLUMNS } from '../utils/tabs';
import { useCurrentBranchValue } from '../../../../common/constants/recoilValues';

export const Activity = () => {
  const currentBranch = useCurrentBranchValue();
  // @ts-ignore
  const activities = currentBranch && currentBranch?.activities;

  const sortedActivities = [...activities].sort(
    // @ts-ignore
    (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime),
  );

  return (
    <div className="sdsa">
      <CommonSettingTable
        data={sortedActivities}
        columns={ADMIN_USER_ACTIVITES_COLUMNS}
      />
    </div>
  );
};
