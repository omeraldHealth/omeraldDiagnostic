
import { errorAlert, warningAlert } from "@components/atoms/alerts/alert";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getDiagnosticUserApi } from "@utils";
import { Modal, Space, Tag } from "antd";
import { useState } from "react";
import { useQueryClient} from "react-query";
import { useAuthContext } from "utils/context/auth.context";
import { branchDetailsEditFormArray} from "utils/types/molecules/forms.interface";
import { SettingsCommon } from "./settings";
import { useQueryGetData, useUpdateDiagnostic } from "utils/reactQuery";
import axios from "axios";

export function BranchManagement() {    
    const { confirm } = Modal;
    const [edit,setEdit] = useState(false)
    const [initialData,setInitial] = useState({})
    const [addElement,setAddElement] = useState(false)
    const [selectedValue,setSelectedValue] = useState("Select Role")
    const {diagnosticDetails} = useAuthContext()
    const queryClient = useQueryClient();
    const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
    const [branchId,setBranchId] = useState(null)

    const updateDiagnostic = useUpdateDiagnostic({
      onSuccess: (data) => {
        warningAlert("Branch updated succesfully")
        setEdit(false)
        setAddElement(false)
        queryClient.invalidateQueries("getDiagnostic")
      },
      onError: (error) => {

      },
    });


    const branchList:any = diagnostic?.data?.branchDetails?.map((branch:any) =>  {return {"text": branch?.branchName,"value":branch?.branchName}})

    const handleRemove = async (value:any) => {
      let updatedBranch = diagnostic?.data?.branchDetails?.filter((branch:any) => branch?._id !== value?._id)
      updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"branchDetails":updatedBranch}})
    }

    const handleEdit = async (value:any) => {
      let initial = {
        "branchName": value?.branchName,
        "branchContact":value?.branchContact,
        "branchEmail":value?.branchEmail,
        "branchAddress":value?.branchAddress,
        "_id":value._id
      }
      // let resp = await axios.get(getBranchById+value?.branchContact)
      // if(resp?.status==200){
      //   setBranchId(resp?.data[0]?._id)
      // }
      setInitial(initial)
      setEdit(!edit)
      setAddElement(!addElement)
    }

    const handleSubmit = async (value:any) => {
      value.branchOperator = value.branchOperator ? value.branchOperator.map(oper => oper.key):null;
      let duplicate = diagnostic?.data?.branchDetails.some((branch:any) => (branch._id !== initialData._id && 
        (branch?.branchName.trim() === value?.branchName.trim() || branch.branchContact === value.branchContact)));
        
      if(duplicate){
        errorAlert("Duplicate Record found with name or contact")
      }else if(edit){
       
        let updated = {...initialData,...value}
        let updatedBranch = diagnostic?.data?.branchDetails?.map((branch:any) => {
          if( branch._id == initialData?._id){
            return {...branch,...updated}
          } return branch
        })
        updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"branchDetails":updatedBranch}})
      }else{
        let filter = diagnostic?.data?.branchDetails
        filter?.push(value)
        updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"branchDetails":filter}})
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
          title: 'Branch Operator',
          dataIndex: 'branchOperator',
          key: 'branchOperator',
          render: (text:any) => {return text.map((tag:any) => <Tag color="green" key={tag}>{getEmployee(tag)}</Tag>)}
          // sorter: (a:any, b:any) => a.branchAddress.length - b.branchAddress.length,
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

    function getEmployee(number:any){

      const found = diagnostic?.data?.managersDetail.find(manager => manager.managerContact === number);
      return found ? found.managerName : null;
    }
 
    return (
      <SettingsCommon selectedValue={selectedValue} setSelectedValue={setSelectedValue} columns={columns} data={diagnostic?.data?.branchDetails} setAddElement={setAddElement} addElement={addElement} tabIndex={2} setEdit={setEdit} edit={edit} initialData={initialData} handleSubmit={handleSubmit} settingsForm={branchDetailsEditFormArray} />
    )
}