import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Spinner } from '@components/atoms/loader';
import { ActivityColumns, BranchColumns, EmployeeColumns, PathologistColumns } from 'utils/forms/form';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { useRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { branchDetailsFormArray, managerFormArray, pathologistFormArray } from 'utils/types/molecules/forms.interface';
import dynamic from 'next/dynamic';

const Billing = dynamic(() => import('@components/organism/settingsTabs/billing').then(res=>res.Billing),{loading: () => <Spinner/>})
const SettingsCommon = dynamic(() => import('@components/organism/settingsTabs/settings').then(res=>res.SettingsCommon),{loading: () => <Spinner/>})
const Support = dynamic(() => import('@components/organism/settingsTabs/support').then(res=>res.Support),{loading: () => <Spinner/>})

export function SettingsTab() {
  const [activeKey, setActiveKey] = useState('Billing');
  const [profile,setProfile] = useRecoilState(profileState);
  const [addElement,setAddElement] = useState(false);
  const [editElement,setEditElement] = useState(false);
  const [defaultValues,setDefaultValue] = useState({});

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated sucessfully")
      setProfile(data?.data);
    },
    onError: (error) => {
      errorAlert("Error updating profile")
    },
  });

  const handleTabChange = (key:any) => {
    setActiveKey(key);
  };

  const handleEdit = (value:any) => {
    setEditElement(true)
    let defaultValues = value;
    setDefaultValue(defaultValues)
  }

  const handleEditValue = (record:any) => {
    let recordType = fetchRecordType(activeKey);
    if (!profile?.[recordType].some((item) => item.name === record.name )) {
      const editedValue = profile?.[recordType].map((item) => item.name === defaultValues.name ? record : defaultValues);
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: editedValue } });
      setEditElement(false);
    }
    else if (!profile?.[recordType].some((item) => item.managerName === record.managerName )) {
      const editedValue = profile?.[recordType].map((item) => item.managerName === defaultValues.managerName ? record : defaultValues);
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: editedValue } });
      setEditElement(false);
    }
    else if (!profile?.[recordType].some((item) => item.branchName === record.branchName )) {
      const editedValue = profile?.[recordType].map((item) => item.branchName === defaultValues.branchName ? record : defaultValues);
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: editedValue } });
      setEditElement(false);
    }
    else {
      // Handle case where record.name is already present
      warningAlert("Record with name already exists");
      setAddElement(false);
      // You can show a message or take appropriate action here
    }
  
  }

  const handleAdd = (record:any) => {
    let recordType = fetchRecordType(activeKey);
  
    // Check if record.name is not already present
    if (!profile?.[recordType].some((item) => item.name === record.name )) {
      let updateData = [...profile?.[recordType], record];
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
      setAddElement(false);
    } else if (!profile?.[recordType].some((item) => item.managerName === record.managerName )) {
      let updateData = [...profile?.[recordType], record];
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
      setAddElement(false);
    }
    else if (!profile?.[recordType].some((item) => item.branchName === record.branchName )) {
      let updateData = [...profile?.[recordType], record];
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
      setAddElement(false);
    }
    
    else {
      // Handle case where record.name is already present
      warningAlert("Record with name already exists");
      setAddElement(false);
      // You can show a message or take appropriate action here
    }
  };

  const fetchRecordType = (key: any) => {
    switch (key) {
      case "Employee Management":
        return "managersDetail";
      case "Branch Management":
        return "managerDetails";
      case "Pathologist Management":
        return "pathologistDetail";
    }
  }

  const handleRemove = (recordType: any, record: any) => {
    let updateData = profile?.[recordType].filter((item: any) => item._id !== record._id);
    updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } })
  };

  const settingProp = {
    handleSubmit: addElement ? handleAdd : handleEditValue,
    addElement: addElement,
    setAddElement: setAddElement,
    editElement: editElement,
    setEditElement: setEditElement,
    defaultValues: defaultValues,
  };

  const tabComponents = {
    "Billing": <Billing/>,
    "Activity": <SettingsCommon tabName="Activity" columns={ActivityColumns} data={profile ? profile?.activities : []} hideButton={true} />,
    
    "Employee Management":  <SettingsCommon columns={EmployeeColumns(handleEdit,handleRemove, profile)} data={profile ? profile?.managersDetail : []} 
      tabName="Employee" form={managerFormArray}  {...settingProp} />,

    "Branch Management":  <SettingsCommon columns={BranchColumns(handleEdit, handleRemove,profile)} data={profile ? profile?.branchDetails : []} 
    tabName="Branch" form={branchDetailsFormArray}  {...settingProp}
    />,

    "Pathologist Management": <SettingsCommon columns={PathologistColumns(handleEdit, handleRemove)} data={profile ? profile?.pathologistDetail : []} 
    tabName="Pathologist" form={pathologistFormArray} {...settingProp}
    />,

    "Support": <Support/> 
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

