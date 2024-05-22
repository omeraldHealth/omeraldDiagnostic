import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { Spinner } from '@components/atoms/loader';
import { ActivityColumns, BranchColumns, EmployeeColumns, PathologistColumns } from 'utils/forms/form';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { errorAlert, errorAlert2, successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { useRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { branchDetailsFormArray, managerFormArray, pathologistFormArray } from 'utils/types/molecules/forms.interface';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';
import { settingTabState } from 'components/common/recoil/settings/index';
import { logoStateData } from '@components/common/recoil/logo';
import { uploadDiagnosticReportApi } from '@utils';
import axios from 'axios';
import dynamic from 'next/dynamic';


const Billing = dynamic(() => import('@components/organism/dashboardTabs/settingsTabs/billing').then(res => res.Billing), { loading: () => <Spinner /> });
const SettingsCommon = dynamic(() => import('@components/organism/dashboardTabs/settingsTabs/settings').then(res => res.SettingsCommon), { loading: () => <Spinner /> });
const Support = dynamic(() => import('@components/organism/dashboardTabs/settingsTabs/support').then(res => res.Support), { loading: () => <Spinner /> });

export default function SettingsTab() {
  const [profile, setProfile] = useRecoilState(profileState);
  const [activeKey, setActiveKey] = useRecoilState(settingTabState);
  const [addElement, setAddElement] = useState(false);
  const [editElement, setEditElement] = useState(false);
  const [defaultValues, setDefaultValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [logoState, setLogoState] = useRecoilState(logoStateData);
  const currentBranch = useCurrentBranchValue();

  const selectedBranch = JSON.parse(localStorage?.getItem("selectedBranch"));

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated successfully");
      setProfile(data?.data);
    },
    onError: (error) => {
      errorAlert("Error updating profile");
    },
  });

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleEdit = (value: any) => {
    setEditElement(true);
    setDefaultValue(value);
  };

  const handleEditValue = (record: any) => {
    // Implementation of edit logic (commented out)
  };

  const customRequest = async ({ endpoint, file, headers }: { endpoint: string, file: File, headers: any }) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(endpoint, formData, { headers });
        return response;
      } else {
        errorAlert2("Error uploading signature");
      }
    } catch (error) {
      errorAlert2("Error uploading file:");
      throw new Error('File upload failed.');
    }
  };

  const handleAdd = async (record: any) => {
    const recordType = fetchRecordType(activeKey);

    if (!profile?.[recordType].some((item: any) => item.name === record.name)) {
      try {
        const logoResp = await customRequest({
          endpoint: uploadDiagnosticReportApi,
          file: logoState,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (logoResp?.status === 200) {
          successAlert("File uploaded successfully");
          record = { ...record, signature: logoResp?.data?.url };
          const updatedBranches = profile.branches.map((branch: Branch) => {
            if (branch._id === currentBranch._id) {
              const updatedPathologistDetail = Array.isArray(branch.pathologistDetail) && branch.pathologistDetail.length > 0
                ? branch.pathologistDetail.map(pathologist => pathologist.name === record.name ? { ...pathologist, ...record } : pathologist)
                : [record];

              return { ...branch, pathologistDetail: updatedPathologistDetail, updatedAt: new Date() };
            }
            return branch;
          });
          const updatedProfile = { ...profile, branches: updatedBranches };

          updateDiagnostic.mutate({ data: { id: profile?._id, branches: updatedProfile.branches } });
          setAddElement(false);
          successAlert("Added pathologist");
        } else {
          errorAlert("Error uploading pathologist signature");
        }
      } catch (error) {
        errorAlert2("Error uploading pathologist signature");
      } finally {
        setLoading(false);
      }
    } else {
      warningAlert("Duplicate Record already exists");
      setAddElement(false);
    }
  };

  const fetchRecordType = (key: string) => {
    switch (key) {
      case "3":
        return "managersDetail";
      case "4":
        return "branchDetails";
      case "5":
        return "pathologistDetail";
      default:
        return "";
    }
  };

  const handleRemove = (recordType: string, record: any) => {
    const updateData = profile?.[recordType].filter((item: any) => item._id !== record._id);
    updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
    warningAlert(`Deleted successfully`);
  };

  const handleImage = async (val: any) => {
    const imageObject = Object.preventExtensions(val?.logo[0]?.originFileObj);
    setLogoState(imageObject);
  };

  const settingProp = {
    handleSubmit: addElement ? handleAdd : handleEditValue,
    addElement,
    setAddElement,
    editElement,
    setEditElement,
    defaultValues,
  };

  const filteredBranch = profile?.branches?.find((branch: any) => branch?._id === currentBranch?._id);

  const tabComponents: TabsProps['items'] = [
    {
      key: '1',
      label: 'Billing',
      children: <Billing />,
    },
    {
      key: '2',
      label: 'Activity',
      children: <SettingsCommon tabName="Activity" columns={ActivityColumns} data={selectedBranch ? selectedBranch.activities : []} hideButton={true} />,
    },
    {
      key: '3',
      label: 'Employee Management',
      children: <SettingsCommon columns={EmployeeColumns(handleEdit, handleRemove, profile)} data={profile ? profile.managersDetail : []} tabName="Employee" form={managerFormArray} {...settingProp} />,
    },
    {
      key: '4',
      label: "Branch Management",
      children: <SettingsCommon columns={BranchColumns(handleEdit, handleRemove, profile)} data={profile ? profile.branchDetails : []} tabName="Branch" form={branchDetailsFormArray} {...settingProp} />,
    },
    {
      key: '5',
      label: "Pathologist Management",
      children: <SettingsCommon columns={PathologistColumns(handleAdd, handleRemove)} data={filteredBranch ? filteredBranch.pathologistDetail : []} tabName="Pathologist" form={pathologistFormArray(handleImage)} {...settingProp} />,
    },
    {
      key: '6',
      label: 'Support',
      children: <Support />,
    },
  ];

  return (
    <div className="justify-center flex">
      <div className='bg-white p-8 w-full mt-4 min-h-[80vh]'>
        <Tabs defaultActiveKey={activeKey} items={tabComponents} onChange={handleTabChange} />
        {loading && <Spinner />}
      </div>
    </div>
  );
}
