import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { TrashIcon } from "@heroicons/react/20/solid";
import { insertDiagnosticUserApi, updateDiagnosticUserApi } from "@utils";
import { Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { QueryCache, QueryClient, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SET_DIAGNOSTIC_DETAILS } from "utils/store/types";
const queryClient = new QueryClient()

export function EmployeeManagement() {
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const [addOperator,setAddOperator] = useState(false)
    const columns =    [
        {
          title: 'Operator Name',
          dataIndex: 'managerName',
          key: 'managerName',
          render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
        },
        {
            title: 'Operator Role',
            dataIndex: 'managerRole',
            key: 'managerRole',
            render: (text:any) => <a>{text}</a>,
        },
        {
          title: 'Operator Contact',
          dataIndex: 'managerContact',
          key: 'managerContact',
          render: (text:any) => <a>{text}</a>,
        },
        {
            title: 'Action',
            dataIndex: 'managerSignature',
            key: 'managerSignature  ',
            render: (_, record,index) => (
              <Space size="middle">
                {record?._id && (index !== 0 ? <a ><TrashIcon onClick={()=>{handleRemoveEmployee(record._id)}} className='w-4 text-red-500' /></a> :<p>Cannot delete Admin</p>)}
              </Space>
            ),
        },
    ]
    const [selectedRole, setSelectedRole] = useState("Select Role");
    const diagnosticMutate = useMutation(updatedObject => 
    {return axios.post(updateDiagnosticUserApi+diagnosticDetails?.phoneNumber,updatedObject)}, 
    {onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosticProfile'] })
      setAddOperator(false)
    },});
    const dispatch = useDispatch()
    
    const handleEmployee = async (value:any) => {
      let data = diagnosticDetails?.managersDetail || [];
      data.push(value)

      if(diagnosticDetails){
        diagnosticMutate.mutate({"managersDetail":data})
        ActivityLogger(`added ${value.managerName} as branch ${value.managerRole}`,diagnosticDetails)
      }
    }

    const handleRemoveEmployee = async (value:any) => {
      let man = diagnosticDetails?.managersDetail.filter((manager:any) => manager._id === value) || [];
      let data = diagnosticDetails?.managersDetail.filter((manager:any) => manager._id !== value) || [];
      console.log(data)
      if(diagnosticDetails){
          diagnosticMutate.mutate({"managersDetail":data})
          dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"managersDetail":data}})
          ActivityLogger(`removed ${man.managerName} from branch`,diagnosticDetails)
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
                      <DynamicFormCreator selectedRole={selectedRole} setSelectedRole={setSelectedRole} handleSubmit={handleEmployee} buttonText="submit" formProps={employeeDetails}  />
                    </section>
                  }
              </section>
            <section className="w-[100%] flex justify-start ">
                  <button onClick={()=>{setAddOperator(!addOperator)}} className="bg-gray-200 p-2 rounded-md">
                    {!addOperator ?  "Add Operator" : "View Operator"}
                  </button>
              </section>
          </section>
    )
}

