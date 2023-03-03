import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Space } from "antd";
import { useState } from "react";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails } from "utils/hook/userDetail";


export function BranchManagement() {
    const {diagnosticDetails,setDiagnosticDetails} = useAuthContext()
    const [addOperator,setAddOperator] = useState(false)
    const columns = [
        {
          title: 'Branch Name',
          dataIndex: 'branchName',
          key: 'branchName',
          render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
        },
        {
            title: 'Branch Email',
            dataIndex: 'branchEmail',
            key: 'branchEmail',
            render: (text:any) => <a>{text}</a>,
        },
        {
            title: 'Branch Contact',
            dataIndex: 'branchContact',
            key: 'branchContact',
            render: (text:any) => <a>{text}</a>,
        },
        {
          title: 'Branch Address',
          dataIndex: 'branchAddress',
          key: 'branchAddress',
          render: (text:any) => <a>{text}</a>,
        },
        // {
        //   title: 'Branch Operator',
        //   dataIndex: 'branchManager',
        //   key: 'branchManager',
        //   render: (text:any) => <a>{text}</a>,
        // },
        {
          title: 'Action',
          dataIndex: 'branchAddress',
          key: 'branchAddress  ',
          render: (_, record:any) => (
            <Space size="middle">
             {record?._id && <a><TrashIcon onClick={()=>{handleRemoveBranch(record?._id)}} className='w-4 text-red-500' /></a>}
            </Space>
          ),
      },
    ]

    const branchForm = [
      {"name":"branchName","type":"text","label":"Branch Name","required":true},
      {"name":"branchEmail","type":"text","label":"Branch Email","required":true},
      {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
      {"name":"branchContact","type":"text","label":"Branch Contact","required":true}
    ]

    const handleBranch = async (value:any) => {
      let data = diagnosticDetails?.branchDetails || [];
      data.push(value)

      if(diagnosticDetails){
        let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"branchDetails":data})

        if(resp.data.acknowledged){
           ActivityLogger(`created ${value.branchName} branch`,diagnosticDetails)
           setAddOperator(false)
        }
      }
    }

    const handleRemoveBranch= async (value:any) => {
      console.log(value)
      let data = diagnosticDetails?.branchDetails.filter(branch => branch._id !== value) || [];
      if(diagnosticDetails){
        let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"branchDetails":data})
        setDiagnosticDetails({...diagnosticDetails,"branchDetails":data})
        if(resp.data.acknowledged){
           ActivityLogger(`removed ${data.branchName}`,diagnosticDetails)
           setAddOperator(false)
        }
      }
    }

	  return (
        <section >
             <section className="min-h-[45vh]">
            {!addOperator ? <div className=""> <DashboardTable columns={columns} data={diagnosticDetails?.branchDetails} /></div>:
                 <section className="w-[50%] my-10 relative">
                 <DynamicFormCreator  handleSubmit={handleBranch} buttonText="submit" formProps={branchForm}  />
               </section>
            }
            </section>
           <section className="w-[100%] flex justify-start ">
                <button onClick={()=>{setAddOperator(!addOperator)}} className="bg-gray-200 p-2 rounded-md">
                  {!addOperator ?  "Add Branch" : "View Branch"}
                </button>
           </section>
        </section>
    )
}
