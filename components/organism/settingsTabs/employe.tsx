import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { success } from "@styles/color";
import { getDiagnosticUserApi, insertDiagnosticUserApi, updateDiagnosticUserApi } from "@utils";
import { Modal, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { QueryCache, QueryClient, useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "utils/hook/userDetail";
import { SET_DIAGNOSTIC_DETAILS } from "utils/store/types";
const queryClient = new QueryClient()

export function EmployeeManagement() {
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const [addOperator,setAddOperator] = useState(false)
    const { confirm } = Modal;
    const columns =    [
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
            onFilter: (value: string, record) => record.managerRole.indexOf(value) === 0,
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
                 <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> 
                {(index !== 0 ? <a ><TrashIcon onClick={()=>{
                   confirm({
                    title: 'Do you want to delete this employee?',
                        content: 'The action cannot be undone.',
                    onOk() {
                      handleRemoveEmployee(record.managerName)}
                    }
                   )
                }} className='w-4 text-red-500' /></a> :<p></p>)}
              </Space>
            ),
        },
    ]
    const [selectedRole, setSelectedRole] = useState("Select Role");
    const fetchDiagnostic = async () => {return await axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)}
    const [edit,setEdit] = useState(false)
    const [initialData,setInitial] = useState()
    const dispatch = useDispatch()
    
    const handleEmployee = async (value:any) => {
      let data = diagnosticDetails?.managersDetail || [];
     
      let duplicate = data.some((manager:any) => {return (manager.managerName===value.managerName || manager.managerContact===value.managerContact)})

      if(edit){
        let data = diagnosticDetails?.managersDetail?.filter((dat)=>dat._id !== initialData.id)
        data.push(value)
        if(diagnosticDetails){
              let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"managersDetail":data})
              if(resp.status==200){
                successAlert("Employee Added Succesfully")
                ActivityLogger(`added ${value.managerName} as branch ${value.managerRole}`,diagnosticDetails)
                dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:{...diagnosticDetails,"managersDetail":data}})
                setAddOperator(false)
                // refetch({force:true})
              }
        }
        setEdit(false)
      }else{
        if(!duplicate){
          data.push(value)
          if(diagnosticDetails){
                let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"managersDetail":data})
                if(resp.status==200){
                  successAlert("Employee Added Succesfully")
                  ActivityLogger(`added ${value.managerName} as branch ${value.managerRole}`,diagnosticDetails)
                  dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:{...diagnosticDetails,"managersDetail":data}})
                  setAddOperator(false)
                  // refetch({force:true})
                }
          }
        }else{
          errorAlert(`User by name/phoneNumber exists already`)
        }
      }
     
    }

    const handleEdit = (value:any) => {
      let initial = {
        "managerName": value.managerName,
        "managerContact":value.managerContact,
        "managerRole":value.managerRole,
        "id":value._id
      }
      console.log(initial)
      setInitial(initial)
      setEdit(true)
      setAddOperator(true)
    }

    const handleRemoveEmployee = async (value:any) => {
      let man = diagnosticDetails?.managersDetail.filter((manager:any) => manager.managerName === value) || [];
      let data = diagnosticDetails?.managersDetail.filter((manager:any) => manager.managerName !== value) || [];

      if(diagnosticDetails){
          let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"managersDetail":data})
          if(resp.status==200){
            successAlert("Employee deleted Succesfully")
            dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"managersDetail":data}})
            ActivityLogger(`removed ${man[0].managerName} from branch`,diagnosticDetails)
          }
      }
    }

    const employeeDetails = [
      {"name":"managerName","type":"text","label":"Operator Name","required":true},
      {"name":"managerContact","type":"text","label":"Operator Contact","required":true},
      {"name":"managerRole","type":"roles","label":"Operator Role","required":true}
    ]

    return (
          <section >
              <section className="min-h-[45vh]">
                  {!addOperator ? <div className=""> <DashboardTable columns={columns} data={diagnosticDetails?.managersDetail} /></div>:
                    <section className="w-[50%] my-10 relative">
                      <DynamicFormCreator initial={edit && initialData} selectedRole={selectedRole} setSelectedRole={setSelectedRole} handleSubmit={handleEmployee} buttonText={edit?"update":"submit"} formProps={employeeDetails}  />
                    </section>
                  }
              </section>
            <section className="w-[100%] flex justify-start ">
                  <button onClick={()=>{setAddOperator(!addOperator) 
                  setEdit(false)}} className="bg-gray-200 p-2 rounded-md">
                    {!addOperator ?  "Add Operator" : "View Operator"}
                  </button>
              </section>
          </section>
    )
}


function diagnosticProfile(){
  const dispatch = useDispatch()
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const fetchDiagnostic = async () => {return await axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)}
  const {data,isLoading} = useQuery(["diagnosticProfile",diagnosticDetails],fetchDiagnostic)

  if(!isLoading){
    successAlert("Diagnostic profile")
    dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:data})
  }
}