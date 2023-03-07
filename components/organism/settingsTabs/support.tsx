import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { ContactForm } from "@components/molecules/form/contact-form";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { useAmp } from "next/amp";
import { useEffect, useState } from "react";
import { useAuthContext } from "utils/context/auth.context";
import { getQueries } from "utils/hook/userDetail";

export function Support() {
    const [query,setQuery] = useState(false);
    const {diagnosticDetails} = useAuthContext()
    const [queries,setQueries] = useState([]);
    const columns =   [ 
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

    useEffect(()=>{
        getQueries({"phoneNumber": diagnosticDetails?.phoneNumber})
        .then(response => setQueries(response.data))
        .catch(error => console.log(error));
    },[query])

    const handleSubmit = () =>{
        setQuery(false)
        if(diagnosticDetails){
            ActivityLogger("raised query to support",diagnosticDetails)
        }
    }

	return (
            <section>
                <section className="min-h-[45vh]">
                    {!query ? <div className=""> <DashboardTable columns={columns} data={queries} /></div>:<ContactForm handleSubmit={handleSubmit}/>}
                </section>
           
                <section className="w-[100%] flex justify-start">
                        <button onClick={()=>{setQuery(!query)}} className="bg-gray-200 p-2 rounded-md">
                            {!query ?  "Add Query" : "View Queries"}
                        </button>
                </section>
            </section>
    )
}

