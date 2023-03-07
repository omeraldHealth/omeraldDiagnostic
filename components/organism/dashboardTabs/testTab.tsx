import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment, useState } from 'react'
import React from 'react'
import { Popover, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@components/atoms/loader';
import { SET_DIAGNOSTIC_DETAILS } from 'utils/store/types';
import { updateUserDetails } from 'utils/hook/userDetail';
import { successAlert } from '@components/atoms/alerts/alert';
import { AddTestComponent } from '@components/molecules/addReport/addTest';
import Search from 'antd/es/transfer/search';
import { TrashIcon } from '@heroicons/react/20/solid';

interface DataType {
  key: string;
  testName: string;
  sampleType: SampleType;
}

interface SampleType {
  sampleName: string,
  keywords: any[];
}

export default function TestTab() {
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  let dispatch = useDispatch()
  const [test,setTest] = useState(false)

  const handleEdit = (record:any) =>{}

  const handleRemove = async (record:any) => {
    let test = diagnosticDetails?.tests.filter((test:any)=>test.testName !== record.testName)

    dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:{...diagnosticDetails,"tests":test}})
    let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"tests":test})
    if(resp.status==200){
      successAlert("Test removed succesfully")
    }
  }

  let pathList = []

  diagnosticDetails?.tests?.forEach((man:any) => {
        const obj = { 
          text: man.tastName, 
          value: man.tastName 
        };
        pathList.push(obj)
  });
  
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
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>{handleRemove(record)}}><TrashIcon className='w-4 text-red-500' /></a>
        </Space>
      ),
    },
  ];

  const [tests,setTestData] = useState(diagnosticDetails?.tests)

  const handleSearch = (event) => {
    let x = diagnosticDetails?.tests.filter((test)=>{return test.sampleName.includes(event.target.value) || test.testName.includes(event.target.value)})
    setTestData(x)
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
            {!test?<>{!diagnosticDetails ? <Spinner/> :<DashboardTable pageSize={7} columns={columns} data={tests}/> }</>:
            <AddTestComponent setTest={setTest} />}</div>
        </div>
    </Fragment>   
  )
}
