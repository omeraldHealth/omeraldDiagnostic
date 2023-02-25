import { TrashIcon } from '@heroicons/react/20/solid'
import { Space, Table } from 'antd'
import React from 'react'

export const SettingsTable = (data) => {

  const activities = [
    [
        {
          title: 'Activity',
          dataIndex: 'activity',
          key: 'activity',
          render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
        },
        {
            title: 'Activity By',
            dataIndex: 'user',
            key: 'user',
            render: (text) => <a>{text.managerName}</a>,
        },
        {
            title: 'Activity Time',
            dataIndex: 'updatedTime',
            key: 'updatedTime',
            render: (text) => <a>{text}</a>,
        },
     
    ],
    [
    {
      title: 'Operator Name',
      dataIndex: 'managerName',
      key: 'managerName',
      render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
    },
    {
        title: 'Operator Role',
        dataIndex: 'managerRole',
        key: 'managerRole',
        render: (text) => <a>{text}</a>,
    },
    {
      title: 'Operator Contact',
      dataIndex: 'managerContact',
      key: 'managerContact',
      render: (text) => <a>{text}</a>,
  },
    {
        title: 'Action',
        dataIndex: 'managerSignature',
        key: 'managerSignature  ',
        render: (_, record,index) => (
          <Space size="middle">
            {record?._id && (index !== 0 ? <a onClick={()=>{data.handle(record)}} ><TrashIcon className='w-4 text-red-500' /></a> :<p>Cannot delete Admin</p>)}
          </Space>
        ),
    },
    ],
    [
        {
          title: 'Branch Name',
          dataIndex: 'branchName',
          key: 'branchName',
          render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
        },
        {
            title: 'Branch Email',
            dataIndex: 'branchEmail',
            key: 'branchEmail',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Branch Contact',
            dataIndex: 'branchContact',
            key: 'branchContact',
            render: (text) => <a>{text}</a>,
        },
        {
          title: 'Branch Address',
          dataIndex: 'branchAddress',
          key: 'branchAddress',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Branch Operator',
          dataIndex: 'branchManager',
          key: 'branchManager',
          render: (text) => <a>{text?.managerName}</a>,
        },
        {
          title: 'Action',
          dataIndex: 'branchAddress',
          key: 'branchAddress  ',
          render: (_, record) => (
            <Space size="middle">
             {record?._id && <a onClick={()=>{data.handle(record)}}><TrashIcon className='w-4 text-red-500' /></a>}
            </Space>
          ),
      },
    ],
    [
      {
        title: 'Pathologist Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
      },
      {
          title: 'Pathologist Designation',
          dataIndex: 'designation',
          key: 'designation',
          render: (text) => <a>{text}</a>,
      },
      {
          title: 'Pathologist Signature',
          dataIndex: 'signature',
          key: 'signature',
          render: (text) => <img src={text} className="w-[200px] h-[70px]" />,
      },
      {
        title: 'Action',
        dataIndex: 'branchAddress',
        key: 'branchAddress  ',
        render: (_, record) => (
          <Space size="middle">
            {record._id &&   <a onClick={()=>{data.handle(record)}}><TrashIcon className='w-4 text-red-500' /></a>}
          </Space>
        ),
    },
  ], 
  [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
    },
    {
        title: 'Query',
        dataIndex: 'message',
        key: 'message',
        render: (text) => <a className='italic font-bold '>{text}</a>,
    },
    {
        title: 'Branch',
        dataIndex: 'branch',
        key: 'branch',
        render: (text) =><a className='text-blue-800 font-medium'>{text}</a>,
    },
    {
      title: 'Query Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
  },
] 
]

  return (
    <div className='h-[80%] overflow-y-auto'>
        <Table columns={activities[data.ind]} dataSource={data?.data}  pagination={false}  />
    </div>
  )
}
