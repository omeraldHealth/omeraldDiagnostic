import { useState } from 'react';
import { useCurrentBranchValue, useProfileValue, useUserValues } from '@components/common/constants/recoilValues';
import { Button, Descriptions, Form, Input, Switch } from 'antd';
import { BranchColumns, PathologistColumns } from 'utils/forms/form';
import { DashboardTable } from '@components/molecules/dashboardItems/data-table';
import axios from 'axios';
import { uploadDiagnosticLogoApi } from '@utils';
import { errorAlert2, successAlert } from '@components/atoms/alerts/alert';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { Loader } from '@components/atoms/loader/loader';
import { useSetRecoilState } from 'recoil';
import { branchState } from '@components/common/recoil/branch/branch';
import { profileState } from '@components/common/recoil/profile';
import { useActivityLogger } from '@components/common/logger.tsx/activity';


export default function BranchComp() {
  const [showTest, setShowTest] = useState(false);
  const currentBranch = useCurrentBranchValue();
  const setCurrentBranch = useSetRecoilState(branchState)
  const setDiagnosticProfile = useSetRecoilState(profileState)
  const [image, setImage] = useState(null);
  const profile = useProfileValue()
  const [loading,setLoading] = useState(false)
  const user = useUserValues()
  const {logActivity} = useActivityLogger()

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data)=>{
        successAlert("Added Branch succesfully")
        setShowTest(false)
        setCurrentBranch(data?.data?.branches?.filter(branch=> branch?._id === currentBranch?._id)[0])
        setDiagnosticProfile(data?.data)
        setLoading(false)
    },
    onError: ()=>{
        errorAlert2("Error adding branch")
        setLoading(false)
    }
  },profile?._id)


  const handleEdit = async (data) => {
    let finaleData = { ...data, branchOperator: [user?._id] };
    logActivity("Added Branch `"+ finaleData?.branchName+"`")
    // Create a new array of branches containing existing branches plus finaleData
    let updatedBranches = [...(profile?.branches || []), finaleData];
    updateDiagnostic.mutate({data: {branches: updatedBranches}})
  };
  

  const handleRemove = (id) => {
    let removing = profile?.branches?.filter((path)=>path?._id === id)[0]
    logActivity("Deleted Branch "+ removing?.branchName)
    let filteredBranches = profile?.branches?.filter((path)=>path?._id !== id)
    updateDiagnostic.mutate({data: {branches: filteredBranches}})
  };

  return (
    <div className="p-0 h-auto bg-signBanner">
      <span className='flex justify-end'>
        <Switch
          style={{ fontSize: '10px' }}
          checkedChildren="Add"
          unCheckedChildren="View"
          checked={showTest}
          className='bg-black'
          onChange={() => setShowTest(!showTest)}
        />
      </span>
      {loading && <Loader/>}
      <div className="h-auto bg-white my-4 sm:mt-4 min-h-[auto]">
        {!showTest ? 
          <PathTable columns={BranchColumns(handleEdit, handleRemove, profile,currentBranch)} paths={profile?.branches} /> : 
          <AddPathForm onFinish={handleEdit} handleImage={setImage} />}
      </div>
    </div>
  );
}

const PathTable = ({ columns, paths }) => {
  return (
    <section>
      <DashboardTable pageSize={10} columns={columns} data={paths} />
    </section>
  );
};

const { TextArea } = Input;

const AddPathForm = ({ onFinish, handleImage }) => {
  return (
    <section className='my-2'>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="m-4"
      >
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Form.Item
              name={"branchName"}
              label="Branch Name"
              className='w-[20vw]'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"branchEmail"}
              label="Branch Email"
              className='w-[20vw]'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"branchContact"}
              label="Branch Contact"
              className='w-[20vw]'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"branchAddress"}
              label="Branch Address"
              className='w-[20vw]'
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>

          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

