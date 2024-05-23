import { useState } from 'react';
import { useCurrentBranchValue, useProfileValue } from '@components/common/constants/recoilValues';
import { Button, Form, Input, Switch } from 'antd';
import { PathologistColumns } from 'utils/forms/form';
import { DashboardTable } from '@components/molecules/dashboardItems/data-table';
import axios from 'axios';
import { uploadDiagnosticLogoApi } from '@utils';
import { errorAlert2, successAlert } from '@components/atoms/alerts/alert';
import { useUpdateDiagnostic } from 'utils/reactQuery';
import { Loader } from '@components/atoms/loader/loader';
import { useSetRecoilState } from 'recoil';
import { branchState } from '@components/common/recoil/branch/branch';
import { profileState } from '@components/common/recoil/profile';

export default function PathologistComp() {
  const [showTest, setShowTest] = useState(false);
  const currentBranch = useCurrentBranchValue();
  const setCurrentBranch = useSetRecoilState(branchState)
  const setDiagnosticProfile = useSetRecoilState(profileState)
  const [image, setImage] = useState(null);
  const profile = useProfileValue()
  const [loading,setLoading] = useState(false)

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data)=>{
        successAlert("Added pathologist succesfully")
        setShowTest(false)
        setCurrentBranch(data?.data?.branches?.filter(branch=> branch?._id === currentBranch?._id)[0])
        localStorage.setItem("selectedBranch",JSON.stringify(data?.data?.branches?.filter(branch=> branch?._id === currentBranch?._id)[0] ))
        setDiagnosticProfile(data?.data)
        setLoading(false)
    },
    onError: ()=>{
        errorAlert2("Error adding pathologist")
        setLoading(false)
    }
  },profile?._id)


  const handleAdd = async (data) => {
    setLoading(true)
    try {
      const imageUrl = await uploadImage(image);
      if (imageUrl) {
        successAlert('Signature uploaded');
        let updatedPath = { ...data, signature: imageUrl };
        const updatedBranch = {
          ...currentBranch,
          pathologistDetail: [...currentBranch.pathologistDetail, updatedPath],
        };
        console.log(updatedBranch)
        const updatedBranches = profile?.branches?.map((branch) => {
          if (branch?._id === currentBranch?._id) {
            return updatedBranch
          } else {
            return branch; // Corrected return statement
          }
        })
        console.log("update", updatedBranches)
        updateDiagnostic.mutate({ data: { branches: updatedBranches } })
      }
    } catch (error) {
      errorAlert2('Error creating path:', error);
    }
    setLoading(false)
  };
  

  const handleRemove = (id) => {
    let removedPath = currentBranch?.pathologistDetail?.filter((path)=>path?._id !== id)
    const updatedBranch = {
        ...currentBranch,
        pathologistDetail: removedPath,
    };
    const updatedBranches = profile?.branches?.map((branch)=> {
        if(branch?._id === currentBranch?._id){
            return updatedBranch
        }else{
            return branch; // Corrected return statement
        }
    })
    updateDiagnostic.mutate({data: {branches: updatedBranches}})
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
          <PathTable columns={PathologistColumns(handleAdd, handleRemove)} paths={currentBranch?.pathologistDetail} /> : 
          <AddPathForm onFinish={handleAdd} handleImage={setImage} />}
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
              name={"name"}
              label="Pathologist Name"
              className='w-[20vw]'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"designation"}
              className='w-[20vw]'
              label="Pathologist Designation"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"signature"}
              label="Pathologist Signature"
            >
              <FileUploader handleImage={handleImage} />
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

const FileUploader = ({ handleImage }) => {
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImage(file);
      }
    };
  
    return (
      <div className="flex items-center">
        <input type="file" onChange={handleChange} accept="image/*" className="hidden" id="file-upload" />
        {/* <label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400">Upload Logo</span>
          </div>
        </label> */}
      </div>
    );
  };

const uploadImage = async (file) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(uploadDiagnosticLogoApi, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data.url;  // Assuming the response contains the URL in data.url
      } else {
        errorAlert2("Error uploading signature");
      }
    } catch (error) {
      errorAlert2("Error uploading file:", error);
      throw new Error('File upload failed.');
    }
  };