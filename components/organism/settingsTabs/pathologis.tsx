import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";
import { ActivityLogger } from "@components/molecules/logger.tsx/activity";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Modal, Space } from "antd";
import { sign } from "crypto";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails, uploadImage } from "utils/hook/userDetail";
import { SET_DIAGNOSTIC_DETAILS } from "utils/store/types";


export function PathologistManagement() {
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const [addOperator,setAddOperator] = useState(false)
    const [loading,setLoading] = useState(false)
    const [edit,setEdit] = useState(false)
    const [signature,setSignature] = useState()
    const [initialData,setInitial] = useState()
    let pathList = []
    const { confirm } = Modal;

    diagnosticDetails?.pathologistDetail?.forEach((man:any) => {
        const obj = { 
          text: man.designation, 
          value: man.designation 
        };
        pathList.push(obj)
    });

    const columns =   [
        {
          title: 'Pathologist Name',
          dataIndex: 'name',
          key: 'name',
          render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
          sorter: (a:any, b:any) => a.name.length - b.name.length,
        },
        {
            title: 'Pathologist Designation',
            dataIndex: 'designation',
            key: 'designation',
            render: (text:any) => <a>{text}</a>,
            sorter: (a:any, b:any) => a.designation.length - b.designation.length,
            filters: pathList,
            onFilter: (value: string, record) => record.designation.indexOf(value) === 0,
        },
        {
            title: 'Pathologist Signature',
            dataIndex: 'signature',
            key: 'signature',
            sorter: (a:any, b:any) => a.signature.length - b.signature.length,
            render: (text:any) => <span>{text ? <img src={text} className="w-[100px] h-[30px]" />:<p className="font-light text-sm text-red-600">Not found</p>}</span>
        },
        {
          title: 'Action',
          dataIndex: 'name',
          key: 'name  ',
          render: (text:any,record) => (
            <Space size="middle">
             <a > <TrashIcon className='w-4 text-red-500' onClick={()=>{
               confirm({
                title: 'Do you want to delete this pathologist?',
                content: 'The action cannot be undone.',
                onOk() {
                  handleRemoveBranch(record.name)}
                }
               )
             }}/></a> 
             <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> 
            </Space>
          ),
      },
    ]
    const dispatch = useDispatch()
    const pathologist = [
      {"name":"name","type":"text","label":"Pathologist Name","required":true},
      {"name":"designation","type":"text","label":"Pathologist Designation","required":true},
      {"name":"signature","type":"banner","label":"Pathologist Signature","required":true},
    ]

    const handleBranch = async (value:any) => {
      setLoading(true)

      if(edit){
        if(value.name === initialData?.name || !diagnosticDetails?.pathologistDetail?.some((path)=>path.name === value.name)){
          if(signature){
            let resp = await uploadImage(signature)
            if(resp){
              value.signature = resp;
            }
          }
          else{
            value.signature = initialData.signature
          }
          console.log(initialData)
          console.log(diagnosticDetails.pathologistDetail)
          let data = diagnosticDetails.pathologistDetail.filter((path:any)=>path._id !== initialData.id)
          console.log(data)
          data.push(value)
          if(diagnosticDetails){
            let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"pathologistDetail":data})
            if(resp){
               successAlert("Updated pathologist succesfully")
               dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"pathologistDetail":data}})
               ActivityLogger(`Updated pathologist`,diagnosticDetails)
               setAddOperator(false)
            }
          }
          setSignature(null)
        }else{
          errorAlert("Pathologies with same name exists already")
        }
        setEdit(false)
      }else{
        if(!diagnosticDetails?.pathologistDetail?.some((path)=>path.name === value.name)){
          let resp = await uploadImage(signature)
          if(resp){
            value.signature = resp;
          }
          let data = diagnosticDetails.pathologistDetail
          data.push(value)
          
          if(diagnosticDetails){
            let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"pathologistDetail":data})
            if(resp){
               ActivityLogger(`created ${value.name} as pathologist`,diagnosticDetails)
               successAlert("created pathologist succesfully")
               dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"pathologistDetail":data}})
               setAddOperator(false)
            }
          }
          setSignature(null)
        }else{
          errorAlert("Pathologies with same name exists already")
        }
      }

      setLoading(false)
    }

    const handleImage = (value:any) => {
        setSignature(value.banner)
    }

    const handleRemoveBranch= async (value:any) => {

      let data = diagnosticDetails?.pathologistDetail.filter((branch:any) => branch.name !== value) || [];

      if(diagnosticDetails){
        let resp = await updateUserDetails({"phoneNumber":diagnosticDetails.phoneNumber},{"pathologistDetail":data})
        // setDiagnosticDetails({...diagnosticDetails,"branchDetails":data})
        if(resp.data.acknowledged){
           ActivityLogger(`removed pathologist`,diagnosticDetails)
           successAlert("Pathologist removed succesfully")
           dispatch({"type":SET_DIAGNOSTIC_DETAILS,"payload":{...diagnosticDetails,"pathologistDetail":data}})
           setAddOperator(false)
        }
      }
    }

    const handleEdit = (value:any) => {

      let initial = {
        "name": value.name,
        "designation":value.designation,
        "signature":value.signature,
        "id":value._id
      }
      setInitial(initial)
      setAddOperator(true)
      setEdit(true)
    }
   
	  return (
        <section >
            <section className="min-h-[45vh]">
            {!addOperator ? <div className=""> <DashboardTable columns={columns} data={diagnosticDetails?.pathologistDetail} /></div>:
            <section className="w-[50%] my-10 relative">
            <DynamicFormCreator initial={edit && initialData}  handleImage={handleImage}  handleSubmit={handleBranch} buttonText={edit?"update":"submit"} formProps={pathologist}  />
            </section>
            }
           </section>
           <section className="w-[100%] flex justify-start ">
                <button onClick={()=>{
                  setAddOperator(!addOperator) 
                  setEdit(false)}} className="bg-gray-200 p-2 rounded-md">
                  {!addOperator ?  "Add Pathalogist" : "View Pathalogist"}
                </button>
            </section>
            {loading && <Spinner/>}
        </section>
    )
}
