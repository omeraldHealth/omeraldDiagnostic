import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Space } from "antd";
import { useState } from "react";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails } from "utils/hook/userDetail";

export function EmployeeManagement() {
    const {diagnosticDetails} = useAuthContext()
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
                {record?._id && (index !== 0 ? <a ><TrashIcon className='w-4 text-red-500' /></a> :<p>Cannot delete Admin</p>)}
              </Space>
            ),
        },
    ]

    const handleEmployee = async (value:any) => {
      let data = diagnosticDetails?.managersDetail || [];
      data.push(value)
      if(diagnosticDetails){
        let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"managersDetails":data})
        if(resp.status==200){
            console.log("action")
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
                    <DynamicFormCreator handleSubmit={handleEmployee} buttonText="submit" formProps={employeeDetails}  />
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

