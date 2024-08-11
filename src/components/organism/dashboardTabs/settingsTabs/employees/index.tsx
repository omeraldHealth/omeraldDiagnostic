import React, { useState } from 'react';
import { useCurrentBranchValue, useUserValues } from '@components/common/constants/recoilValues';
import { CommonSettingTable } from '../utils/table';
import { BRANCH_EMPLOYEE_COLUMNS } from '../utils/tabs';
import { Switch } from 'antd';
import AddEmployee from './create';

export const EmployeesTab = () => {
    const [addBranch, setAdd] = useState(false)
    const currentBranch = useCurrentBranchValue()
    const profileOwner = useUserValues()

    const handleEdit = () => {}
    const handleRemove = () => {}
    const handleSwitch = (checked: boolean) => {setAdd(checked)}
    const handleShowBranch = (value) => {setAdd(value)}

    return (
      <div className='sdsa'>
          <section className='my-2 py-2 flex justify-end'>
            <Switch style={{backgroundColor:"orange"}} onChange={handleSwitch} checkedChildren={"Add"} unCheckedChildren={"View"} />
          </section>
          {!addBranch ?
          <CommonSettingTable data={currentBranch?.branchOperator} columns={BRANCH_EMPLOYEE_COLUMNS}/>:
          <AddEmployee handleShowBranch={handleShowBranch} />
          }
      </div>
    );
};
