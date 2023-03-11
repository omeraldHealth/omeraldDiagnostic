
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getDiagnosticUserApi } from "@utils";
import { Modal, Space } from "antd";
import { useState } from "react";
import { useQuery} from "react-query";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails } from "utils/hook/userDetail";
import { EmployeeDetails } from "utils/types/molecules/forms.interface";
import { SettingsCommon } from "./settings";
import axios from "axios";

export function EmployeeManagement() {    
    const { confirm } = Modal;
    const [edit,setEdit] = useState(false)
    const [initialData,setInitial] = useState({})
    const [addElement,setAddElement] = useState(false)
    const [selectedValue,setSelectedValue] = useState("Select Role")
    const {diagnosticDetails} = useAuthContext()
    const {data:diag,refetch} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})

    const handleRemove = async (value:any) => {

      let updatedManager = diag?.data?.managersDetail?.filter((manager:any) => manager?._id !== value._id)
      let resp = await updateUserDetails({"phoneNumber":diag?.data?.phoneNumber},{"managersDetail":updatedManager})

      if(resp.status==200){
        warningAlert("Employee removed succesfully")
        setEdit(false)
        setAddElement(false)
        refetch();
      }
    }

    const handleEdit = (value:any) => {
      let initial = {
        "managerName": value?.managerName,
        "managerContact":value?.managerContact,
        "managerRole":value?.managerRole,
        "_id":value._id
      }

      setInitial(initial)
      setEdit(!edit)
      setAddElement(!addElement)
    }

    const handleSubmit = async (value:any) => {
      let duplicate = diag?.data?.managersDetail.some((manager:any) => {return (manager.managerName===value.managerName || manager.managerContact===value.managerContact)})

      if(!edit && duplicate){
        errorAlert("Duplicate Record found with name or contact")
      }else if(edit){
        let updated = {...initialData,...value}
        let updatedManager = diag?.data?.managersDetail?.map((manager:any) => {
          if( manager._id == initialData?._id){
            return {...manager,...updated}
          } return manager
        })
        let resp = await updateUserDetails({"phoneNumber":diag?.data?.phoneNumber},{"managersDetail":updatedManager})
        if(resp.status==200){
          successAlert("Employee Updated succesfully")
          setEdit(false)
          setAddElement(false)
          refetch();
        }
      }else{
        let filter = diag?.data?.managersDetail
        filter?.push(value)
        let resp = await updateUserDetails({"phoneNumber":diag?.data?.phoneNumber},{"managersDetail":filter})

        if(resp.status==200){
          successAlert("Employee added succesfully")
          setEdit(false)
          setAddElement(false)
          refetch();
        }
      }
    }

    const columns =  [
      {
        title: 'Operator Name',
        dataIndex: 'managerName',
        key: 'managerName',
        render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
        sorter: (a:any, b:any) => a.managerName.length - b.managerName.length,
      },
      {
          title: 'Operator Role',
          dataIndex: 'managerRole',
          key: 'managerRole',
          render: (text:any) => <a>{text}</a>,
          sorter: (a:any, b:any) => a.managerRole.length - b.managerRole.length,
          filters: [{"text":"Admin",value:"Admin"},
          {"text":"Manager",value:"Manager"},
          {"text":"Operator",value:"Operator"},
          {"text":"Spoc",value:"Spoc"}],
          onFilter: (value: string, record:any) => record.managerRole.indexOf(value) === 0,
      },
      {
        title: 'Operator Contact',
        dataIndex: 'managerContact',
        key: 'managerContact',
        render: (text:any) => <a>{text}</a>,
        sorter: (a:any, b:any) => a.managerContact.length - b.managerContact.length,
      },
      {
          title: 'Action',
          dataIndex: 'managerSignature',
          key: 'managerSignature  ',
          render: (i,record,index) => (
            <Space size="middle">
               {(record?.managerRole !== "Owner") && <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> }

              {((record?.managerRole !== "Owner") ? <a ><TrashIcon onClick={()=>{
                 confirm({
                  title: 'Do you want to delete this employee?',
                      content: 'The action cannot be undone.',
                  onOk() {
                    handleRemove(record)}
                  }
                 )
              }} className='w-4 text-red-500' /></a> :<p></p>)}
            </Space>
          ),
      },
    ]
 
    return (
      <SettingsCommon selectedValue={selectedValue} setSelectedValue={setSelectedValue} columns={columns} data={diag?.data?.managersDetail} setAddElement={setAddElement} addElement={addElement} tabIndex={2} setEdit={setEdit} edit={edit} initialData={initialData} handleSubmit={handleSubmit} settingsForm={EmployeeDetails} />
    )
}
