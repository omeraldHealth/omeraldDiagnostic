import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { ContactForm } from "@components/molecules/form/contact-form";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { getDiagnosticUserApi, getQueriesApi } from "@utils";
import axios from "axios";
import { useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { useAuthContext } from "utils/context/auth.context";

export function Support() {
    const {diagnosticDetails} = useAuthContext()
    const [query,setQuery] = useState(false);
    const {data:queries,refetch} = useQuery("queries",()=>{return axios.get(getQueriesApi+diagnosticDetails?.phoneNumber)})
   
    const SupportForm =   [ 
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subjectsss',
            render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
            sorter: (a:any, b:any) => a.subject.length - b.subject.length,
        },
        {
            title: 'Query',
            dataIndex: 'message',
            key: 'messagesss',
            render: (text:any) => <a className='italic font-bold '>{text}</a>,
            sorter: (a:any, b:any) => a.message.length - b.message.length,
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branchsss',
            render: (text:any) =><a className='text-blue-800 font-medium'>{text}</a>,
            sorter: (a:any, b:any) => a.branch.length - b.branch.length,
        },
        {
            title: 'Query Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
            sorter: (a:any, b:any) => a.createdAt.length - b.createdAt.length,
        },
    ] 

    const handleSubmit = () =>{
        setQuery(!query)
        refetch()
        // ActivityLogger("Sent a query to omerald support")
    }

	return (
        <section>
                {/* Query Table */}
                <section className="min-h-[45vh]">
                    {!query ? <div className=""> 
                    <DashboardTable columns={SupportForm} data={queries?.data} /></div>
                    :<ContactForm handleSubmit={handleSubmit}/>}
                </section>
                {/* Toggle Button */}
                <section className="w-[100%] flex justify-start">
                    <button onClick={()=>{setQuery(!query)}} className="bg-gray-200 p-2 rounded-md">{!query ?  "Add Query" : "View Queries"}</button>
                </section>
        </section>
    )
}

