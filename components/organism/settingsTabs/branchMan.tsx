import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails } from "utils/hook/userDetail";
import { SET_DIAGNOSTIC_DETAILS } from "utils/store/types";


export function BranchManagement() {
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const [addOperator,setAddOperator] = useState(false)
    const [edit,setEdit] = useState(false)
    let branchList = []
    diagnosticDetails?.branchDetails?.forEach((man:any) => {
        const obj = { 
          text: man.branchName, 
          value: man.branchName 
        };
        branchList.push(obj)
      });
    
      const [initialData,setInitial] = useState()

    const handleEdit = (value:any) => {
        let initial = {
          "branchName": value.branchName,
          "branchEmail":value.branchEmail,
          "branchContact":value.branchContact,
          "branchAddress":value.branchAddress,
          "id":value._id
        }
        setInitial(initial)
        setEdit(true)
        setAddOperator(true)
      }
    

    const columns = [
        {
          title: 'Branch Name',
          dataIndex: 'branchName',
          key: 'branchName',
          render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
          sorter: (a:any, b:any) => a.branchName.length - b.branchName.length,
          filters: branchList,
          onFilter: (value: string, record) => record.branchName.indexOf(value) === 0,
        },
        {
            title: 'Branch Email',
            dataIndex: 'branchEmail',
            key: 'branchEmail',
            render: (text:any) => <a>{text}</a>,
            sorter: (a:any, b:any) => a.branchEmail.length - b.branchEmail.length,
   
        },
        {
            title: 'Branch Contact',
            dataIndex: 'branchContact',
            key: 'branchContact',
            render: (text:any) => <a>{text}</a>,
            sorter: (a:any, b:any) => a.branchContact.length - b.branchContact.length,
        },
        {
          title: 'Branch Address',
          dataIndex: 'branchAddress',
          key: 'branchAddress',
          render: (text:any) => <a>{text}</a>,
          sorter: (a:any, b:any) => a.branchAddress.length - b.branchAddress.length,
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
          render: (_, record:any,index:any) => (
            <Space size="middle">
               <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> 
             {index != 0 && <a><TrashIcon onClick={()=>{handleRemoveBranch(record?._id)}} className='w-4 text-red-500' /></a>}
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
    const dispatch = useDispatch()
    const handleBranch = async (value:any) => {
      let duplicate = diagnosticDetails?.branchDetails.some((branch:any)=>{return (branch.branchName !== value.branchName && branch.branchEmail !== value.branchEmail && branch.branchContact !== value.branchContact)})
      let data = diagnosticDetails?.branchDetails || [];
   

      if(edit){

        let data = diagnosticDetails.branchDetails.filter((path:any)=>path._id !== initialData.id)
          data.push(value)
          let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"branchDetails":data})
  
          if(resp.data.acknowledged){
             
             ActivityLogger(`created ${value.branchName} branch`,diagnosticDetails)
             successAlert("Branch pathologist succesfully")
              dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"branchDetails":data}})
             setAddOperator(false)
          }
      }else{
        data.push(value)
        if(diagnosticDetails && duplicate){
          let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"branchDetails":data})
  
          if(resp.data.acknowledged){
             ActivityLogger(`created ${value.branchName} branch`,diagnosticDetails)
             successAlert("Branch pathologist succesfully")
              dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"branchDetails":data}})
             setAddOperator(false)
          }
        }else{
          errorAlert("Branch with name/email/phone already exists")
        }
      }
      setEdit(false)
    }

    const handleRemoveBranch= async (value:any) => {
      let data = diagnosticDetails?.branchDetails.filter((branch:any) => branch._id !== value) || [];
      if(diagnosticDetails){
        let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"branchDetails":data})
        // setDiagnosticDetails({...diagnosticDetails,"branchDetails":data})
        dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"branchDetails":data}})

        if(resp.data.acknowledged){
          successAlert("Branch deleted succesfully")
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
                 <DynamicFormCreator initial={initialData}  handleSubmit={handleBranch} buttonText={edit? "update":"submit"} formProps={branchForm}  />
               </section>
            }
            </section>
           <section className="w-[100%] flex justify-start ">
                <button onClick={()=>{setAddOperator(!addOperator) 
                  setEdit(false)}} className="bg-gray-200 p-2 rounded-md">
                  {!addOperator ?  "Add Branch" : "View Branch"}
                </button>
           </section>
        </section>
    )
}
