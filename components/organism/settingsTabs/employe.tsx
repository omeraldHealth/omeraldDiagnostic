
import { errorAlert, warningAlert } from "@components/atoms/alerts/alert";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getDiagnosticUserApi, getEmployeeById } from "@utils";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { useQueryClient} from "react-query";
import { useAuthContext } from "utils/context/auth.context";
import { EmployeeDetails } from "utils/types/molecules/forms.interface";
import { SettingsCommon } from "./settings";
import { useAddEmployee, useDeleteEmployee, useQueryGetData, useUpdateDiagnostic, useUpdateEmployee } from "utils/reactQuery";
import axios from "axios";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";

export function EmployeeManagement() {    
    const { confirm } = Modal;
    const [edit,setEdit] = useState(false)
    const [initialData,setInitial] = useState({})
    const [addElement,setAddElement] = useState(false)
    const [selectedValue,setSelectedValue] = useState("Select Role")
    const {diagnosticDetails,activeBranch,operator} = useAuthContext()
    const queryClient = useQueryClient();
    const {data:diagnostic}  = useQueryGetData("diagnosticDetails",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
    const [employeeId,setEmployeeId] = useState(null)

    const updateDiagnostic = useUpdateDiagnostic({
      onSuccess: (data) => {
        warningAlert("Employee updated succesfully")
        setEdit(false)
        setAddElement(false)
        queryClient.invalidateQueries("getDiagnostic")
      },
      onError: (error) => {

      },
  });

  const addEmployee = useAddEmployee({
    onSuccess: (data) => {
      // warningAlert("Branch added succesfully")
      queryClient.invalidateQueries("diagnosticDetails")
    },
    onError: (error) => {

    },
  });

  const updateEmployee = useUpdateEmployee({
    onSuccess: (data) => {
      // warningAlert("Branch added succesfully")
      queryClient.invalidateQueries("diagnosticDetails")
    },
    onError: (error) => {

    },
  });

  const deleteEmployee = useDeleteEmployee({
    onSuccess: (data) => {
      // warningAlert("Branch deleted succesfully")
      queryClient.invalidateQueries("diagnosticDetails")
    },
    onError: (error) => {

    },
  });


    const handleRemove = async (value:any) => {
      let updatedManager = diagnostic?.data?.managersDetail?.filter((manager:any) => manager?._id !== value._id)
      updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"managersDetail":updatedManager}})
      deleteEmployee.mutate({userId:value?._id})
      ActivityLogger("Deleted "+value?.managerName+"as "+value?.managerRole,diagnostic?.data,operator,activeBranch)
    }

    const handleEdit = async (value:any) => {
      let initial = {
        "managerName": value?.managerName,
        "managerContact":value?.managerContact,
        "managerRole":value?.managerRole,
        "_id":value._id
      }
      let resp = await axios.get(getEmployeeById+value?.managerContact)
      if(resp?.status==200){
        setEmployeeId(resp?.data?._id)
      }
      setInitial(initial)
      setEdit(!edit)
      setAddElement(!addElement)
    }

    const handleSubmit = async (value:any) => {
      let duplicate = diagnostic?.data?.managersDetail.some((manager:any) => (manager._id !== initialData._id && (manager.managerName === value.managerName || manager.managerContact === value.managerContact)));
      value["managerContact"] = phoneNumber
      if( duplicate){
        errorAlert("Duplicate Record found with name or contact")
      }else if(edit){
        let updated = {...initialData,...value}
        let updatedManager = diagnostic?.data?.managersDetail?.map((manager:any) => {
          if( manager._id == initialData?._id){
            return {...manager,...updated}
          } return manager
        })
        updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"managersDetail":updatedManager}})
        value.mainBranchId =  diagnosticDetails?.phoneNumber;
        updateEmployee.mutate({userId:employeeId,data:value})
        ActivityLogger("Modified "+value?.managerName+" as "+value?.managerRole,diagnostic?.data,operator,activeBranch)

      }else{
        let filter = diagnostic?.data?.managersDetail
        filter?.push(value)
        updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"managersDetail":filter}})
        value.mainBranchId =  diagnosticDetails?.phoneNumber;
        value.branchId = activeBranch?._id
        addEmployee.mutate(value)
        ActivityLogger("Added "+value?.managerName+" as "+value?.managerRole,diagnostic?.data,operator,activeBranch)
      }
    }

    const columns =  [
      {
        title: 'Operator Name',
        dataIndex: 'managerName',
        key: 'managerName',
        render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
        sorter: (a:any, b:any) => a.managerName.length - b.managerName.length,
      },
      {
          title: 'Operator Role',
          dataIndex: 'managerRole',
          key: 'managerRole',
          render: (text:any) => <a>{text}</a>,
          sorter: (a:any, b:any) => a.managerRole.length - b.managerRole.length,
          filters: [{"text":"Admin",value:"Admin"},
          {"text":"Manager",value:"Manager"},
          {"text":"Operator",value:"Operator"},
          {"text":"Spoc",value:"Spoc"}],
          onFilter: (value: string, record:any) => record.managerRole.indexOf(value) === 0,
      },
      {
        title: 'Operator Contact',
        dataIndex: 'managerContact',
        key: 'managerContact',
        render: (text:any) => <a>{text}</a>,
        sorter: (a:any, b:any) => a.managerContact.length - b.managerContact.length,
      },
      {
          title: 'Action',
          dataIndex: 'managerSignature',
          key: 'managerSignature  ',
          render: (i,record,index) => (
            <Space size="middle">
               {(record?.managerRole !== "Owner") && <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> }

              {((record?.managerRole !== "Owner") ? <a ><TrashIcon onClick={()=>{
                 confirm({
                  title: 'Do you want to delete this employee?',
                      content: 'The action cannot be undone.',
                  onOk() {
                    handleRemove(record)}
                  }
                 )
              }} className='w-4 text-red-500' /></a> :<p></p>)}
            </Space>
          ),
      },
    ]

    const [phoneNumber,setPhoneNumber] = useState();
   
    // useEffect(()=>{console.log(phoneNumber)},[phoneNumber])

    let employeeList = diagnostic?.data?.managersDetail?.filter((emp:any) => emp.branchId === activeBranch?._id || emp?.managerRole.toLowerCase() == "owner")
    return (
      <SettingsCommon handleImage={setPhoneNumber} tabName={"Employee"} selectedValue={selectedValue} setSelectedValue={setSelectedValue} columns={columns} data={employeeList} setAddElement={setAddElement} addElement={addElement} tabIndex={2} setEdit={setEdit} edit={edit} initialData={initialData} handleSubmit={handleSubmit} settingsForm={EmployeeDetails} />
    )
}
