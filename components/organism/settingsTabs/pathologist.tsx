
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getDiagnosticUserApi } from "@utils";
import { Modal, Space } from "antd";
import { useState } from "react";
import { useQuery, useQueryClient} from "react-query";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails, uploadImage } from "utils/hook/userDetail";
import {  pathologistFormArray} from "utils/types/molecules/forms.interface";
import { SettingsCommon } from "./settings";
import axios from "axios";
import { Spinner } from "@components/atoms/loader";
import { useQueryGetData, useUpdateDiagnostic } from "utils/reactQuery";

export function PathologistManagement() {    
    const { confirm } = Modal;
    const [edit,setEdit] = useState(false)
    const [initialData,setInitial] = useState({})
    const [addElement,setAddElement] = useState(false)
    const [selectedValue,setSelectedValue] = useState("Select Role")
    const {diagnosticDetails} = useAuthContext()
    const [image,setImage] = useState([]);
    const [loading,setLoading] = useState(false);
    const queryClient = useQueryClient();
    const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
  
    const updateDiagnostic = useUpdateDiagnostic({
      onSuccess: (data) => {
        warningAlert("pathologist data updated succesfully")
        setEdit(false)
        setAddElement(false)
        queryClient.invalidateQueries("getDiagnostic")
      },
      onError: (error) => {

      },
    });

    const pathList:any = diagnostic?.data?.pathologistDetail?.map((path:any) =>  {return {"text": path?.name,"value":path?.name}})

    const handleRemove = async (value:any) => {
      let updatedPath = diagnostic?.data?.pathologistDetail?.filter((path:any) => { return path?._id !== value?._id})
      updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"pathologistDetail":updatedPath}})
    }

    const handleEdit = (value:any) => {
      let initial = {
        "name": value?.name,
        "designation":value?.designation,
        "signature":value?.signature,
        "_id":value._id
      }

      setInitial(initial)
      setEdit(!edit)
      setAddElement(!addElement)
    }

    const handleSubmit = async (value:any) => {
     
      let duplicate = diagnostic?.data?.pathologistDetail.some((path:any) => (path._id !== initialData._id && path.name.trim() === value.name.trim()))
   
      let flag = true;
      setLoading(true)
      if(duplicate){
        errorAlert("Duplicate Record found with name or contact")
      }else if(edit){
        if(flag){
          if(image){
            let location = await uploadImage(image)
            if(location){
              value["signature"] = location
            }
          }
          let updated = {...initialData,...value}
          let updatedPath = diagnostic?.data?.pathologistDetail?.map((path:any) => {
            if( path._id == initialData?._id){
              return {...path,...updated}
            } return path
          })

          updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"pathologistDetail":updatedPath}})
   
        }
      }else{
        let filter = diagnostic?.data?.pathologistDetail
        if(image){
          let location = await uploadImage(image)
          if(location){
            value["signature"] = location
          }
        } 

        filter?.push(value)
        updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:{"pathologistDetail":filter}})
  
      }
      setImage(null)
      setLoading(false)
    }

    const columns = [
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
          render: (text:any,record:any,index:number) => (
            <Space size="middle">
             {index !==0 && <a > <TrashIcon className='w-4 text-red-500' onClick={()=>{
               confirm({
                title: 'Do you want to delete this pathologist?',
                content: 'The action cannot be undone.',
                onOk() {
                  handleRemove(record)}
                }
               )
             }}/></a> }
              <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> 
            </Space>
          ),
      },
    ]

    const handleImage = (value:any) => {
      setImage(value.banner)
    }
 
    return (
      <>
      <SettingsCommon selectedValue={selectedValue} handleImage={handleImage} setSelectedValue={setSelectedValue} columns={columns} data={diagnostic?.data?.pathologistDetail} setAddElement={setAddElement} addElement={addElement} tabIndex={2} setEdit={setEdit} edit={edit} initialData={initialData} handleSubmit={handleSubmit} settingsForm={pathologistFormArray} />
      {loading && <Spinner/>}
      </>
  )
}