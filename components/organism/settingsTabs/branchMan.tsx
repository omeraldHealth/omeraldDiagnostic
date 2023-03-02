import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Space } from "antd";
import { useState } from "react";
import { useAuthContext } from "utils/context/auth.context";


export function BranchManagement() {
    const {diagnosticDetails} = useAuthContext()
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
             {record?._id && <a><TrashIcon className='w-4 text-red-500' /></a>}
            </Space>
          ),
      },
    ]

	return (
        <section >
             <section className="min-h-[45vh]">
            {!addOperator ? <div className=""> <DashboardTable columns={columns} data={diagnosticDetails?.branchDetails} /></div>:<p>sad</p>}
            </section>
           <section className="w-[100%] flex justify-start ">
                <button onClick={()=>{setAddOperator(!addOperator)}} className="bg-gray-200 p-2 rounded-md">
                  {!addOperator ?  "Add Branch" : "View Branch"}
                </button>
           </section>
        </section>
    )
}
