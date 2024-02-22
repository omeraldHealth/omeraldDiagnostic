import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Spinner } from '@components/atoms/loader';
import { ActivityColumns, BranchColumns, EmployeeColumns, PathologistColumns } from 'utils/forms/form';
import { useCurrentBranchValue, useManagerValue, useProfileValue } from '@components/common/constants/constants';
import dynamic from 'next/dynamic';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { useRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { ActivityLogger } from '@components/molecules/logger.tsx/activity';

const Billing = dynamic(() => import('@components/organism/settingsTabs/billing').then(res=>res.Billing),{loading: () => <Spinner/>})
const SettingsCommon = dynamic(() => import('@components/organism/settingsTabs/settings').then(res=>res.SettingsCommon),{loading: () => <Spinner/>})
const Support = dynamic(() => import('@components/organism/settingsTabs/support').then(res=>res.Support),{loading: () => <Spinner/>})

export function SettingsTab() {
  const [activeKey, setActiveKey] = useState('Billing');
  const [profile,setProfile] = useRecoilState(profileState);
  const currentBranch = useCurrentBranchValue();
  const manager = useManagerValue();

  const handleEdit = (id:any) => {

  }

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated sucessfully")
      setProfile(data?.data);
    },
    onError: (error) => {
      errorAlert("Error updating profile")
    },
  });
  
  const handleRemove = (recordType: any, record: any) => {
    let updateData = profile?.[recordType].filter((item: any) => item._id !== record._id);
    updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } })
    switch (recordType) {
      case "branchDetails":
        ActivityLogger(profile,"Deleted Branch "+record.branchName,currentBranch,manager);
        break;
      case "managerDetails":
        ActivityLogger(profile,"Deleted Operator "+record.managerName,currentBranch,manager);
        break;
      case "pathologistDetails":
        ActivityLogger(profile,"Deleted Pathologist "+record.name,currentBranch,manager);
        break;
    }
  };

  const tabComponents = {
    "Billing": <Billing/>,
    "Activity": <SettingsCommon columns={ActivityColumns} data={profile ? profile?.activities : []} />,
    "Employee Management":  <SettingsCommon columns={EmployeeColumns(handleEdit,handleRemove, profile)} data={profile ? profile?.managersDetail : []} />,
    "Branch Management":  <SettingsCommon columns={BranchColumns(handleEdit, handleRemove,profile)} data={profile ? profile?.branchDetails : []} />,
    "Pathologist Management": <SettingsCommon columns={PathologistColumns(handleEdit, handleRemove)} data={profile ? profile?.pathologistDetail : []} />,
    "Support": <Support/>
  };

  const handleTabChange = (key:any) => {
    setActiveKey(key);
  };

  return (
    <div className="sm:p-6 xl:p-8 max-h-[30vh] bg-signBanner flex w-100 justify-center">
      <div className='w-[96vw] lg:w-[80vw] xl:w-[70vw] bg-white shadow-lg mt-10 h-[80vh] lg:h-[70vh] rounded-lg] sm:p-8 p-4'>
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        {Object.keys(tabComponents).map((tabKey) => (
          <Tabs.TabPane tab={tabKey} key={tabKey}>
            {tabComponents[tabKey]}
          </Tabs.TabPane>
        ))}
      </Tabs>
      </div>
    </div>
  );
};

