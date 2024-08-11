import React from 'react';
import { useCurrentBranchValue, useUserValues } from '@components/common/constants/recoilValues';
import { CommonSettingTable } from '../utils/table';
import { BRANCH_EMPLOYEE_COLUMNS } from '../utils/tabs';

export const EmployeesTab = () => {
    const currentBranch = useCurrentBranchValue()
    const branchEmployees = useCurrentBranchValue()
    const profileOwner = useUserValues()

    const handleEdit = () => {}
    const handleRemove = () => {}

    // @ts-ignore
    const activities = currentBranch && currentBranch?.branchOperator;
    return (
      <div className='sdsa'>
          <CommonSettingTable data={branchEmployees} columns={BRANCH_EMPLOYEE_COLUMNS(handleEdit, handleRemove, profileOwner)}/>
      </div>
    );
};
