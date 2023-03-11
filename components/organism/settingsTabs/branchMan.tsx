
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getDiagnosticUserApi } from "@utils";
import { Modal, Space } from "antd";
import { useState } from "react";
import { useQuery} from "react-query";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails } from "utils/hook/userDetail";
import { branchDetailsEditFormArray} from "utils/types/molecules/forms.interface";
import { SettingsCommon } from "./settings";
import axios from "axios";

export function BranchManagement() {    
    const { confirm } = Modal;
    const [edit,setEdit] = useState(false)
    const [initialData,setInitial] = useState({})
    const [addElement,setAddElement] = useState(false)
    const [selectedValue,setSelectedValue] = useState("Select Role")
    const {diagnosticDetails} = useAuthContext()
    const {data:diag,refetch} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})

    const branchList:any = diag?.data?.branchDetails?.map((branch:any) =>  {return {"text": branch?.branchName,"value":branch?.branchName}})

    const handleRemove = async (value:any) => {
      let updatedBranch = diag?.data?.branchDetails?.filter((branch:any) => branch?._id !== value?._id)
      let resp = await updateUserDetails({"phoneNumber":diag?.data?.phoneNumber},{"branchDetails":updatedBranch})

      if(resp.status==200){
        warningAlert("Branch removed succesfully")
        setEdit(false)
        setAddElement(false)
        refetch();
      }
    }

    const handleEdit = (value:any) => {
      let initial = {
        "branchName": value?.branchName,
        "branchContact":value?.branchContact,
        "branchEmail":value?.branchEmail,
        "branchAddress":value?.branchAddress,
        "_id":value._id
      }

      setInitial(initial)
      setEdit(!edit)
      setAddElement(!addElement)
    }

    const handleSubmit = async (value:any) => {
      let duplicate = diag?.data?.branchDetails.some((branch:any) => {return (branch.branchName===value.branchName || branch.branchContact===value.branchContact)})

      if(!edit && duplicate){
        errorAlert("Duplicate Record found with name or contact")
      }else if(edit){
        let updated = {...initialData,...value}
        let updatedBranch = diag?.data?.branchDetails?.map((branch:any) => {
          if( branch._id == initialData?._id){
            return {...branch,...updated}
          } return branch
        })
        let resp = await updateUserDetails({"phoneNumber":diag?.data?.phoneNumber},{"branchDetails":updatedBranch})
        if(resp.status==200){
          successAlert("Branch Updated succesfully")
          setEdit(false)
          setAddElement(false)
          refetch();
        }
      }else{
        let filter = diag?.data?.branchDetails
        filter?.push(value)
        let resp = await updateUserDetails({"phoneNumber":diag?.data?.phoneNumber},{"branchDetails":filter})

        if(resp.status==200){
          successAlert("Employee added succesfully")
          setEdit(false)
          setAddElement(false)
          refetch();
        }
      }
    }

    const columns = [
        {
          title: 'Branch Name',
          dataIndex: 'branchName',
          key: 'branchName',
          render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
          sorter: (a:any, b:any) => a.branchName.length - b.branchName.length,
          filters: branchList,
          onFilter: (value: string, record) => record?.branchName?.indexOf(value) === 0,
        },
        {
            title: 'Branch Email',
            dataIndex: 'branchEmail',
            key: 'branchEmail',
            render: (text:any) => <a>{text}</a>,
            sorter: (a:any, b:any) => a.branchEmail.length - b.branchEmail.length,
   
        },
        {
            title: 'Branch Contact',
            dataIndex: 'branchContact',
            key: 'branchContact',
            render: (text:any) => <a>{text}</a>,
            sorter: (a:any, b:any) => a.branchContact.length - b.branchContact.length,
        },
        {
          title: 'Branch Address',
          dataIndex: 'branchAddress',
          key: 'branchAddress',
          render: (text:any) => <a>{text}</a>,
          sorter: (a:any, b:any) => a.branchAddress.length - b.branchAddress.length,
        },
        {
          title: 'Action',
          dataIndex: 'branchAddress',
          key: 'branchAddress  ',
          render: (_, record:any,index:any) => (
            <Space size="middle">
             {(record?.branchContact !== diagnosticDetails?.phoneNumber) &&  <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> }
             {(record?.branchContact !== diagnosticDetails?.phoneNumber)&& <a>
              <TrashIcon className='w-4 text-red-500' onClick={()=>{
               confirm({
                title: 'Do you want to delete this branch?',
                content: 'The action cannot be undone.',
                onOk() {
                  handleRemove(record)}
                }
               )
             }}/></a>}
            </Space>
          ),
      },
    ]
 
    return (
      <SettingsCommon selectedValue={selectedValue} setSelectedValue={setSelectedValue} columns={columns} data={diag?.data?.branchDetails} setAddElement={setAddElement} addElement={addElement} tabIndex={2} setEdit={setEdit} edit={edit} initialData={initialData} handleSubmit={handleSubmit} settingsForm={branchDetailsEditFormArray} />
    )
}