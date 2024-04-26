import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { Spinner } from '@components/atoms/loader';
import { ActivityColumns, BranchColumns, EmployeeColumns, PathologistColumns } from 'utils/forms/form';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { useRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { branchDetailsFormArray, managerFormArray, pathologistFormArray } from 'utils/types/molecules/forms.interface';
import dynamic from 'next/dynamic';
import { settingTabState } from 'components/common/recoil/settings/index'
import { logoStateData } from '@components/common/recoil/logo';
import { uploadDiagnosticLogoApi } from '@utils';
import axios from 'axios';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';

const Billing = dynamic(() => import('@components/organism/dashboardTabs/settingsTabs/billing').then(res=>res.Billing),{loading: () => <Spinner/>})
const SettingsCommon = dynamic(() => import('@components/organism/dashboardTabs/settingsTabs/settings').then(res=>res.SettingsCommon),{loading: () => <Spinner/>})
const Support = dynamic(() => import('@components/organism/dashboardTabs/settingsTabs/support').then(res=>res.Support),{loading: () => <Spinner/>})

export default function SettingsTab() {
  const [profile,setProfile] = useRecoilState(profileState);
  const [activeKey,setActiveKey] = useRecoilState(settingTabState);
  const [addElement,setAddElement] = useState(false);
  const [editElement,setEditElement] = useState(false);
  const [defaultValues,setDefaultValue] = useState({});
  const [loading,setLoading] = useState(false);
  const [logoState,setLogoState]  = useRecoilState(logoStateData)
  const currentBranch = useCurrentBranchValue()

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
    //Disabled edit
    // let recordType = fetchRecordType(activeKey);
    // if (!profile?.[recordType].some((item) => item.name === record.name )) {
    //   const editedValue = profile?.[recordType].map((item) => item.name === defaultValues.name ? record : defaultValues);
    //   updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: editedValue } });
    //   setEditElement(false);
    // }
    // else if (!profile?.[recordType].some((item) => item.managerName === record.managerName )) {
    //   const editedValue = profile?.[recordType].map((item) => item.managerName === defaultValues.managerName ? record : defaultValues);
    //   updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: editedValue } });
    //   setEditElement(false);
    // }
    // else if (!profile?.[recordType].some((item) => item.branchName === record.branchName )) {
    //   const editedValue = profile?.[recordType].map((item) => item.branchContact === defaultValues.branchContact ? record : defaultValues);
    //   updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: editedValue } });
    //   setEditElement(false);
    // }
    // else {
    //   // Handle case where record.name is already present
    //   warningAlert("Record with name already exists");
    //   setAddElement(false);
    //   // You can show a message or take appropriate action here
    // }
  }

  const handleAdd = async (record:any) => {
    let recordType = fetchRecordType(activeKey);

    // Check if record.name is not already present
    if (!profile?.[recordType].some((item) => item.name === record.name )) {

      // Upload logo
      setLoading(true)
      const formDataImage = new FormData();
      formDataImage.append("file", logoState);
      const logoResp = await axios.post(
        uploadDiagnosticLogoApi,
        formDataImage,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
 

      if (logoResp?.status === 200) {
        record = {...record, signature: logoResp?.data?.url}
        let updateData = [...profile?.[recordType], record];
        updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
        setAddElement(false);
        successAlert("Added pathalogist")
        setLoading(false)
      }else{
        successAlert("Error adding pathalogist")
        setLoading(false)
      }

     
    } else if (!profile?.[recordType].some((item) => item.managerContact === record.managerContact || item.managerName === record.managerName )) {
      record = {...record, branchId: currentBranch?._id}
      let updateData = [...profile?.[recordType], record];
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
      setAddElement(false);
      successAlert("Added manager")
    }
    else if (!profile?.[recordType].some((item) => item.branchContact === record.branchContact || item.branchName === record.branchName)) {
      let updateData = [...profile?.[recordType], record];
      updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
      setAddElement(false);
      successAlert("Added branch")
    }
    else {
      warningAlert("Duplicate Record already exists");
      setAddElement(false);
    }
  };

  const fetchRecordType = (key: any) => {
    switch (key) {
      case "3":
        return "managersDetail";
      case "4":
        return "branchDetails";
      case "5":
        return "pathologistDetail";
    }
  }

  const handleRemove = (recordType: any, record: any) => {
    let updateData = profile?.[recordType].filter((item: any) => item._id !== record._id);
    updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } })
    warningAlert(`Deleted  succesfully`)
  };

  const handleImage = async (val: any) => {
    let imageObject = Object.preventExtensions(
      val?.logo[0]?.originFileObj
    );
    setLogoState(imageObject);
  };

  const settingProp = {
    handleSubmit: addElement ? handleAdd : handleEditValue,
    addElement: addElement,
    setAddElement: setAddElement,
    editElement: editElement,
    setEditElement: setEditElement,
    defaultValues: defaultValues,
  };

  const tabComponents: TabsProps['items'] = [
    {
      key: '1',
      label: 'Billing',
      children: <Billing/>,
    },
    {
      key: '2',
      label: 'Activity',
      children:<SettingsCommon tabName="Activity" columns={ActivityColumns} data={profile ? profile?.activities : []} hideButton={true} />,
    },
    {
      key: '3',
      label: 'Employee Management',
      children: <SettingsCommon columns={EmployeeColumns(handleEdit,handleRemove, profile)} data={profile ? profile?.managersDetail : []} 
      tabName="Employee" form={managerFormArray}  {...settingProp} />,
    },
    {
      key: '4',
      label:  "Branch Management",
      children:  <SettingsCommon columns={BranchColumns(handleEdit, handleRemove,profile)} data={profile ? profile?.branchDetails : []} 
      tabName="Branch" form={branchDetailsFormArray}  {...settingProp}
      />,
    },
    {
      key: '5',
      label:  "Pathologist Management",
      children:   <SettingsCommon columns={PathologistColumns(handleAdd, handleRemove)} data={profile ? profile?.pathologistDetail : []} 
      tabName="Pathologist" form={pathologistFormArray(handleImage)} {...settingProp}
      />,
    },
    {
      key: '6',
      label: 'Support',
      children:  <Support/> 
    },
  ];

  return (
    <div className="sm:p-6 xl:p-8 max-h-[30vh] bg-signBanner flex w-100 justify-center">
      <div className='w-[96vw] lg:w-[80vw] xl:w-[70vw] bg-white shadow-lg mt-10 h-[80vh] lg:h-[70vh] rounded-lg] sm:p-8 p-4'>
        <Tabs defaultActiveKey={activeKey} items={tabComponents} onChange={handleTabChange} />
        {loading && <Spinner/>}
      </div>
    </div>
  );
};

