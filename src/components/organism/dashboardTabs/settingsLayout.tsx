import React, { Children } from 'react';
import { Tabs } from 'antd';
import { useRecoilState } from 'recoil';
import { settingTabState } from '@components/common/recoil/settings/index';
import { Billing } from './settingsTabs/billing/billing';
import { Activity } from './settingsTabs/activity';
import { EmployeesTab } from './settingsTabs/employees';


export default function SettingsTabLayout() {
  const [activeKey, setActiveKey] = useRecoilState(settingTabState);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items = [
    {
      key: '1',
      label: 'Billing',
      children: <Billing/>
    },
    {
      key: '2',
      label: 'Activity',
      children: <Activity/>
    },
    {
      key: '3',
      label: 'Employee Management',
      children: <EmployeesTab/>
    },
    // {
    //   key: '4',
    //   label: "Branch Management",
    // },
    // {
    //   key: '5',
    //   label: "Pathologist Management",
    // },
    // {
    //   key: '6',
    //   label: 'Support',
    //   Children: <Support/>
    // },
  ]

  return (
    <div className="justify-center flex">
      <div className='bg-white p-8 w-full mt-4 min-h-[80vh]'>
        <Tabs defaultActiveKey={activeKey} items={items} onChange={handleTabChange} />
      </div>
    </div>
  );
}


  // const [addElement, setAddElement] = useState(false);
  // const [editElement, setEditElement] = useState(false);
  // const [defaultValues, setDefaultValue] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [logoState, setLogoState] = useRecoilState(logoStateData);
  // const currentBranch = useCurrentBranchValue();

  // const selectedBranch = JSON.parse(localStorage?.getItem("selectedBranch"));

  // const updateDiagnostic = useUpdateDiagnostic({
  //   onSuccess: (data) => {
  //     successAlert("Profile updated successfully");
  //     setProfile(data?.data);
  //   },
  //   onError: (error) => {
  //     errorAlert("Error updating profile");
  //   },
  // });


  // const handleEdit = (value: any) => {
  //   setEditElement(true);
  //   setDefaultValue(value);
  // };

  // const handleEditValue = (record: any) => {
  //   // Implementation of edit logic (commented out)
  // };

  // const customRequest = async ({ endpoint, file, headers }: { endpoint: string, file: File, headers: any }) => {
  //   try {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append('file', file);
  //       const response = await axios.post(endpoint, formData, { headers });
  //       return response;
  //     } else {
  //       errorAlert2("Error uploading signature");
  //     }
  //   } catch (error) {
  //     errorAlert2("Error uploading file:");
  //     throw new Error('File upload failed.');
  //   }
  // };

  // const handleAdd = async (record: any) => {
  //   const recordType = fetchRecordType(activeKey);

  //   if (!currentBranch?.[recordType].some((item: any) => item.name === record.name)) {
  //     try {
  //       const logoResp = await customRequest({
  //         endpoint: uploadDiagnosticReportApi,
  //         file: logoState,
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });

  //       if (logoResp?.status === 200) {
  //         successAlert("File uploaded successfully");
  //         record = { ...record, signature: logoResp?.data?.url };
  //         const updatedBranches = profile.branches.map((branch: Branch) => {
  //           if (branch._id === currentBranch._id) {
  //             const updatedPathologistDetail = Array.isArray(branch.pathologistDetail) && branch.pathologistDetail.length > 0
  //               ? branch.pathologistDetail.map(pathologist => pathologist.name === record.name ? { ...pathologist, ...record } : pathologist)
  //               : [record];

  //             return { ...branch, pathologistDetail: updatedPathologistDetail, updatedAt: new Date() };
  //           }
  //           return branch;
  //         });
  //         const updatedProfile = { ...profile, branches: updatedBranches };

  //         updateDiagnostic.mutate({ data: { id: profile?._id, branches: updatedProfile.branches } });
  //         setAddElement(false);
  //         successAlert("Added pathologist");
  //       } else {
  //         errorAlert("Error uploading pathologist signature");
  //       }
  //     } catch (error) {
  //       errorAlert2("Error uploading pathologist signature");
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     warningAlert("Duplicate Record already exists");
  //     setAddElement(false);
  //   }
  // };

  // const fetchRecordType = (key: string) => {
  //   switch (key) {
  //     case "3":
  //       return "managersDetail";
  //     case "4":
  //       return "branchDetails";
  //     case "5":
  //       return "pathologistDetail";
  //     default:
  //       return "";
  //   }
  // };

  // const handleRemove = (recordType: string, record: any) => {
  //   const updateData = profile?.[recordType].filter((item: any) => item._id !== record._id);
  //   updateDiagnostic.mutate({ data: { id: profile?._id, [recordType]: updateData } });
  //   warningAlert(`Deleted successfully`);
  // };

  // const handleImage = async (val: any) => {
  //   const imageObject = Object.preventExtensions(val?.logo[0]?.originFileObj);
  //   setLogoState(imageObject);
  // };

  // const settingProp = {
  //   handleSubmit: addElement ? handleAdd : handleEditValue,
  //   addElement,
  //   setAddElement,
  //   editElement,
  //   setEditElement,
  //   defaultValues,
  // };

  // const filteredBranch = profile?.branches?.find((branch: any) => branch?._id === currentBranch?._id);
