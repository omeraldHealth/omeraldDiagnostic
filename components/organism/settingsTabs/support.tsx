import { ContactForm } from "@components/molecules/form/contact-form";
import { useState } from "react";
import { useAuthContext } from "utils/context/auth.context";

export function Support() {
    const {diagnosticDetails,activeBranch} = useAuthContext()
    const [query,setQuery] = useState(false);
    // const {data:queries,refetch} = useQuery("queries",()=>{return axios.get(getQueriesApi+diagnosticDetails?.phoneNumber)})
   

    // let queriestList = queries?.data?.filter((query:any)=> query?.branchId === activeBranch?._id)
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
        // refetch()
    }

	return (
        <section>
            <ContactForm handleSubmit={handleSubmit}/>
        </section>
    )
}

