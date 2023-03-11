import { successAlert } from '@components/atoms/alerts/alert';
import { BodyStyled_2 } from '@components/atoms/font/font.style';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { getDiagnosticUserApi } from '@utils';
import { Input, Modal, Popover, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'utils/context/auth.context';
import { updateUserDetails } from 'utils/hook/userDetail';
import { DataType, SET_TEST } from 'utils/store/types';
import { testForm } from 'utils/types/molecules/forms.interface';
import { AddKeyword } from '../addTest/createdKeyword';
import { ShowTable } from '../addTest/showTable';
import { DashboardTable } from '../dashboardItems/data-table'
import { DynamicFormCreator } from '../form/dynamicForm';
import { AddKeywords } from '../addTest/addKeywords';
export const TestTable = ({}:any) => {
  const { confirm } = Modal;
  const [editTest,setEdit] = useState(false);
  const [initialTestDetails,setInitalTest] = useState();
  const {diagnosticDetails} = useAuthContext()
  const {data:diagnostic,refetch} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})
  let tests = diagnostic?.data.tests
  const testDetails = useSelector((state:any)=>state.testReducer)
  const [sampleName,setSampleName] = useState();
  const [testName,setTestName] = useState();


  let pathList = tests?.forEach((man:any) => {
    return   { 
     text: man.tastName, 
     value: man.tastName 
   };
  });

  const dispatch = useDispatch()

  const handleRemoveTest = async (record:any) => {
          let test = tests.filter((test:any)=>test._id !== record._id)
          // @ts-ignore
          let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"tests":test})
          if(resp.data){
            refetch()
            successAlert("Test removed succesfully")
          }
  }

  const handleEditTest = async (value:any) => {
    dispatch({type:SET_TEST,payload:{}})
    let initial = {
      "testName": value?.sampleType?.testName,
      "sampleName":value?.sampleName,
      "keywords":value?.sampleType?.keywords,
      "_id":value._id
    }
    let initial2 = {
    
      "sampleName":value?.sampleName,
      "sampleType":{
        "testName": value?.sampleType?.testName,
        "keywords":value?.sampleType?.keywords,
      }
    }
    dispatch({type:SET_TEST,payload:initial2})
    setInitalTest(initial)
    console.log(initial)
    setEdit(!editTest)
  }

  const columns: ColumnsType<DataType> = [
    {
      key: 'sampleName',
      title: 'Input sample',
      dataIndex: 'sampleName',
      render: (text) => <a>{text}</a>,
      sorter: (a:any, b:any) => a.sampleName.length - b.sampleName.length,
    },
    {
      key: 'testName',
      title: 'Test Name',
      dataIndex: 'sampleType',
      render: (text) => <a>{text.testName}</a>,
      sorter: (a:any, b:any) => a.testName.length - b.testName.length,
      filters: pathList,
      onFilter: (value: string, record) => record.testName.indexOf(value) === 0,
    },
    {
      key: 'keywords',
      title: 'Keywords (Hover to see aliases)',
      dataIndex: 'sampleType',
      sorter: (a:any, b:any) => a.keywords.length - b.keywords.length,
      render: (sampleType,record) => (
        <>
          {sampleType.keywords && sampleType?.keywords.map((param,index) => {
            return (
                <a key={index} href='#'>
                  <Popover content={(param.aliases)} title={record?.sampleType?.testName+" ("+param.keyword+" aliases)"}>
                    <Tag className="my-1" color={"green"} key={param}>
                      {param.keyword.toUpperCase()}
                    </Tag>
                  </Popover>
                </a>
            );
          })}
        </>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (text:any,record:any,index:number) => (
        <Space size="middle">
         {<a > <TrashIcon className='w-4 text-red-500' onClick={()=>{
           confirm({
            title: 'Do you want to delete this pathologist?',
            content: 'The action cannot be undone.',
            onOk() {
                handleRemoveTest(record)}
            }
           )
         }}/></a> }
          <a ><PencilIcon onClick={()=>{handleEditTest(record)}} className='w-4 text-gray-900' /></a> 
        </Space>
      ),
    }
  ]
  const handleUpdateKeyword = async ()=> {
  
    let testItem = {
      "sampleName": sampleName?.length>0? sampleName:initialTestDetails?.sampleName,
      "sampleType": {
        "testName": testName?.length>0 ?testName:initialTestDetails?.testName,
        "keywords":testDetails?.sampleType?.keywords
      }

    }

    let updatedTest = diagnostic?.data.tests.filter((test)=>test._id !== initialTestDetails?._id)
    updatedTest.push(testItem)

    let resp = await updateUserDetails({"phoneNumber":diagnostic?.data?.phoneNumber},{"tests": updatedTest})
      if(resp){
        successAlert("Test Added succesfully")
        refetch()
        setEdit(false)
      }
 
  }

  return (
    <div>
        {!editTest ? <DashboardTable pageSize={5} columns={columns} data={tests}/>:
          <section className='p-8 w-[100%] max-h-[70vh] overflow-y-scroll'>
              <BodyStyled_2>Update Test Details</BodyStyled_2>
              <section className='flex'>
              <span className='w-[35%]'>
                <p className='mt-10'>Sample Name</p>
                <Input value={sampleName} onChange={(e)=>{setSampleName(e.target.value)}} defaultValue={initialTestDetails?.sampleName} name="sampleName" placeholder={"sampleName"} className="border-gray-300 w-[75%] mt-2 mb-10 rounded-lg text-black font-light text-sm py-2" />
              </span>
              <span className='w-[35%]'>
                <p className='mt-10'>Test Name</p>
                <Input value={testName} onChange={(e)=>{setTestName(e.target.value)}}  defaultValue={initialTestDetails?.testName} name="sampleName" placeholder={"sampleName"} className="border-gray-300 w-[75%] mt-2 mb-10 rounded-lg text-black font-light text-sm py-2" />
              </span>
              </section>
              <AddKeywords edit={true} refetch={refetch} handleSucess={()=>{handleUpdateKeyword()}}  />
          </section>
        }
    </div>
  )

}