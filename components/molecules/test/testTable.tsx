import { successAlert } from '@components/atoms/alerts/alert';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { getDiagnosticUserApi } from '@utils';
import { Modal, Popover, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useAuthContext } from 'utils/context/auth.context';
import { updateUserDetails } from 'utils/hook/userDetail';
import { DataType } from 'utils/store/types';
import { DashboardTable } from '../dashboardItems/data-table'

export const TestTable = ({}:any) => {
  const { confirm } = Modal;
  const [editTest,setEdit] = useState(false);
  const [initialTestDetails,setInitalTest] = useState(false);
  const {diagnosticDetails} = useAuthContext()
  const {data:diagnostic,refetch} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})
  let tests = diagnostic?.data.tests
  let pathList = tests?.forEach((man:any) => {
    return   { 
     text: man.tastName, 
     value: man.tastName 
   };
  });

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
    let initial = {
      "testName": value?.testName,
      "sampleName":value?.sampleName,
      "keywords":value?.keywords,
      "_id":value._id
    }
    setInitalTest(initial)
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

  return (
    <div>
        {!editTest ? <DashboardTable pageSize={5} columns={columns} data={tests}/>:
          <></>
        }
    </div>
  )

}