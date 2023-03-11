import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment, useState } from 'react'
import React from 'react'
import { Modal, Popover, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@components/atoms/loader';
import { DataType, SET_DIAGNOSTIC_DETAILS } from 'utils/store/types';
import { updateUserDetails } from 'utils/hook/userDetail';
import { successAlert } from '@components/atoms/alerts/alert';
import { AddTestComponent } from '@components/molecules/addReport/addTest';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useQuery } from 'react-query';
import { getDiagnosticUserApi } from '@utils';
import { useAuthContext } from 'utils/context/auth.context';
import Search from 'antd/es/transfer/search';
import axios from 'axios';

export default function TestTab() {
  const { confirm } = Modal;
  const [test,setTest] = useState(false)
  const {diagnosticDetails} = useAuthContext();
  const {data:diagnostic} = useQuery("diagnosticDetails",()=>{return axios.get(getDiagnosticUserApi+diagnosticDetails?.phoneNumber)})
  let pathList = diagnostic?.data?.tests?.forEach((man:any) => {
    return   { 
     text: man.tastName, 
     value: man.tastName 
   };
  });

  const handleRemove = async (record:any) => {
    confirm({
      title: 'Do you want to delete this test?',
          content: 'The action cannot be undone.',
      async onOk() {
        let test = diagnostic?.data?.tests.filter((test:any)=>test._id !== record._id)
        let resp = await updateUserDetails({"phoneNumber":diagnostic?.data?.phoneNumber},{"tests":test})
        if(resp.data){
          setTestData(test)
          successAlert("Test removed succesfully")
        }
      }
    }) 
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
      dataIndex: 'testName',
      render: (text) => <a>{text}</a>,
      sorter: (a:any, b:any) => a.testName.length - b.testName.length,
      filters: pathList,
      onFilter: (value: string, record) => record.testName.indexOf(value) === 0,
    },
    {
      key: 'keywords',
      title: 'Keywords (Hover to see aliases)',
      dataIndex: 'keywords',
      sorter: (a:any, b:any) => a.keywords.length - b.keywords.length,
      render: (keywords,record) => (
        <>
          {keywords && keywords.map((param,index) => {
            return (
                <a key={index} href='#'>
                  <Popover content={(param.aliases)} title={record.testName+" ("+param.keyword+" aliases)"}>
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
  ];

  const [tests,setTestData] = useState(diagnosticDetails?.tests)

  const handleSearch = (event:any) => {
    let x = diagnosticDetails?.tests.filter((test)=>{return test.sampleName.includes(event.target.value) || test.testName.includes(event.target.value)})
    setTestData(x)
  }

  const handleEdit = (even:any) => {
    
  }

  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner relative flex w-100 justify-center">
              <section className='absolute left-20 ml-10'>
                <Search placeholder="input search text" onChange={handleSearch} onSearch={handleSearch} style={{ width: 300 }} />
              </section>
            
              <section className='absolute right-10 mr-20'>
                {!test ? <button onClick={()=>setTest(!test)} className='bg-blue-500 text-white text-bold font-light rounded-md p-2'>Add Test</button>:<button onClick={()=>setTest(!test)} className='bg-green-800 text-white text-bold font-light rounded-md p-2'>View Test</button>}
              </section>
        
            <div className='w-[70vw] bg-white shadow-lg mt-14 h-[70vh] rounded-lg]'> 
            {!test?<>{!diagnosticDetails ? 
              <Spinner/> :
              <DashboardTable pageSize={5} columns={columns} data={tests}/> }
            </>:
            <AddTestComponent setTest={setTest} />}</div>
        </div>
    </Fragment>   
  )
}
