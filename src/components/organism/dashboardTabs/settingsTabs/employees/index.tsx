import React, { useState } from 'react';
import { useCurrentBranchValue, useProfileValue, useUserValues } from '@components/common/constants/recoilValues';
import { CommonSettingTable } from '../utils/table';
import { BRANCH_EMPLOYEE_COLUMNS } from '../utils/tabs';
import { Switch } from 'antd';
import { usePersistedBranchState } from '@components/common/recoil/hooks/usePersistedState';
import { useInvalidateQuery, useUpdateDiagnostic, useUpdateUser } from '@utils/reactQuery';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import AddEmployee from './create';

export const EmployeesTab = () => {
    const [addBranch, setAdd] = useState(false)
    const [selectedBranch] = usePersistedBranchState()
    const invalidateQuery  = useInvalidateQuery()
    const currentBranch = useCurrentBranchValue() 
    const profileValue = useProfileValue() 
    const updateProfile = useUpdateDiagnostic({})
    const updateUser = useUpdateUser({})

    const handleEdit = () => {}
    
    const handleDelete = (record) => {
      removeUserfromBranch(record)
    }

    const removeUserfromBranch = (record) => {
      // Create a copy of the currentBranch and filter out the operator based on record._id
      const updatedCurrentBranch = {
        ...currentBranch,
        branchOperator: currentBranch?.branchOperator?.filter(
          (operator) => operator?._id !== record?._id
        )
      };
    
      // Map through the profile's branches and update the current branch with the modified operator list
      const updatedBranches = profileValue?.branches?.map((branch) => {
        if (branch?._id === updatedCurrentBranch?._id) {
          return updatedCurrentBranch;
        }
        return branch;
      });
    
      // Call the mutate function to update the profile with the new branches data
      updateProfile.mutate({
        data: { branches: updatedBranches },
        recordId: profileValue?._id
      },{
        onSuccess: (resp) => {
          if(resp.status == 200){
            successAlert("Updated Employee succesfully")
          }
          removeBranchFromUser(record);
        }
      });
  
    };

    const removeBranchFromUser = (record) => {
      const updatedDaigCenters = removeBranchById(record, currentBranch?._id)
      updateUser.mutate({data: {branches: updatedDaigCenters}, recordId: record?._id},{
        onSuccess:(resp)=>{
          if(resp.status == 200){
            successAlert("Updated User successfully")
            invalidateQuery("userData")
            invalidateQuery("diagnosticCenter")
            invalidateQuery("diagnosticSettings")
          }
        },
        onError:()=>{
          errorAlert("Updating Employee failed")
        }
      })
    }

    const handleSwitch = (checked: boolean) => {setAdd(checked)}
    const handleShowBranch = (value) => {setAdd(value)}

    const columns = BRANCH_EMPLOYEE_COLUMNS({selectedBranch, handleEdit, handleDelete})

    return (
      <div className='sdsa'>
          <section className='my-2 py-2 flex justify-end'>
            <Switch style={{backgroundColor:"orange"}} onChange={handleSwitch} checkedChildren={"Add"} unCheckedChildren={"View"} />
          </section>
          {!addBranch ?
          //@ts-ignore
          <CommonSettingTable data={currentBranch?.branchOperator} columns={columns}/>:
          <AddEmployee handleShowBranch={handleShowBranch} />
          }
      </div>
    );
};

function removeBranchById(record, branchIdToRemove) {
  // Iterate over each diagnostic center
  const updatedUser = record.diagnosticCenters.map(center => {
      const updatedBranches = center.branches.filter(branch => branch.branchId !== branchIdToRemove);
      return {
          ...center,
          branches: updatedBranches
      };
  }).filter(center => center.branches.length > 0); 

  return updatedUser;
}