import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Spinner } from '@components/atoms/loader';
import { ActivityColumns, BranchColumns, EmployeeColumns, PathologistColumns } from 'utils/forms/form';
import { useProfileValue } from '@components/common/constants/constants';
import dynamic from 'next/dynamic';

const Billing = dynamic(() => import('@components/organism/settingsTabs/billing').then(res=>res.Billing),{loading: () => <Spinner/>})
const SettingsCommon = dynamic(() => import('@components/organism/settingsTabs/settings').then(res=>res.SettingsCommon),{loading: () => <Spinner/>})
const Support = dynamic(() => import('@components/organism/settingsTabs/support').then(res=>res.Support),{loading: () => <Spinner/>})

export function SettingsTab() {
  const [activeKey, setActiveKey] = useState('Billing');
  const profile = useProfileValue();

  const handleEdit = (id:any) => {

  }
  
  const handleRemove = (id:any) => {

  }

  const tabComponents = {
    "Billing": <Billing/>,
    "Activity": <SettingsCommon columns={ActivityColumns} data={profile ? profile?.activities : []} />,
    "Employee Management":  <SettingsCommon columns={EmployeeColumns(handleEdit,handleRemove)} data={profile ? profile?.managersDetail : []} />,
    "Branch Management":  <SettingsCommon columns={BranchColumns} data={profile ? profile?.branchDetails : []} />,
    "Pathologist Management": <SettingsCommon columns={PathologistColumns} data={profile ? profile?.pathologistDetail : []} />,
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

