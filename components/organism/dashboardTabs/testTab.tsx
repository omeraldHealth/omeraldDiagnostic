import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment } from 'react'
import React from 'react'
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAuthContext } from 'utils/context/auth.context';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';

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

  const handleEdit = (record:any) =>{}

  const handleRemove = (record:any) => {}
  
  const columns: ColumnsType<DataType> = [
    {
      key: 'testName',
      title: 'Test Name',
      dataIndex: 'testName',
      render: (text) => <a>{text}</a>,
    },
    {
      key: 'sampleType',
      title: 'Sample Type',
      dataIndex: 'sampleType',
      render: (text) => <a>{text.sampleName}</a>,
    },
    {
      key: 'keyword',
      title: 'Keywords (Hover to see aliases)',
      dataIndex: 'keyword',
      render: (_,{sampleType}) => (
        <>
          {sampleType?.keywords.map((param,index) => {
            return (
                <a key={index} href='#'>
                  <Tag className="my-1" color={"green"} key={param}>
                    {param.keyword.toUpperCase()}
                  </Tag>
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
          <a onClick={()=>{handleEdit(record)}}><PencilIcon className='w-4 text-gray-500' /> </a>
          {record?._id && <a onClick={()=>{handleRemove(record)}}><TrashIcon className='w-4 text-red-500' /></a>}
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
         <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
            <div className='w-[70vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg]'>
              <DashboardTable columns={columns} data={diagnosticDetails?.tests}/>
            </div>
        </div>
    </Fragment>   
  )
}
