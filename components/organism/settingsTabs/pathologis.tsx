import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Space } from "antd";
import { useState } from "react";
import { useAuthContext } from "utils/context/auth.context";


export function PathologistManagement() {
    const {diagnosticDetails} = useAuthContext()
    const [addOperator,setAddOperator] = useState(false)
    const columns =   [
        {
          title: 'Pathologist Name',
          dataIndex: 'name',
          key: 'name',
          render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
        },
        {
            title: 'Pathologist Designation',
            dataIndex: 'designation',
            key: 'designation',
            render: (text:any) => <a>{text}</a>,
        },
        {
            title: 'Pathologist Signature',
            dataIndex: 'signature',
            key: 'signature',
            render: (text:any) => <span>{text ? <img src={text} className="w-[200px] h-[70px]" />:<p className="font-light text-sm text-red-600">Not found</p>}</span>
        },
        {
          title: 'Action',
          dataIndex: 'branchAddress',
          key: 'branchAddress  ',
          render: (_, record:any) => (
            <Space size="middle">
              {record._id &&   <a ><TrashIcon className='w-4 text-red-500' /></a>}
            </Space>
          ),
      },
    ]

	return (
        <section >
            <section className="min-h-[45vh]">
            {!addOperator ? <div className=""> <DashboardTable columns={columns} data={diagnosticDetails?.pathologistDetail} /></div>:<p>sad</p>}
           </section>
           <section className="w-[100%] flex justify-start ">
                <button onClick={()=>{setAddOperator(!addOperator)}} className="bg-gray-200 p-2 rounded-md">
                  {!addOperator ?  "Add Pathalogist" : "View Pathalogist"}
                </button>
            </section>
        </section>
    )
}
