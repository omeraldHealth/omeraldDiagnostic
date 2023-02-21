import { TrashIcon } from '@heroicons/react/20/solid'
import { Space, Table } from 'antd'
import React from 'react'

export const SettingsTable = (data) => {

  const handleRemove = () => {}

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
      title: 'Manager Name',
      dataIndex: 'managerName',
      key: 'managerName',
      render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
    },
    {
        title: 'Manager Role',
        dataIndex: 'managerRole',
        key: 'managerRole',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'ManagerSignature',
        dataIndex: 'managerSignature',
        key: 'managerSignature',
        render: (text) => { return <img src={text} className="w-[100px] h-[50px]" alt="logo"/>}
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
               <a onClick={()=>{handleRemove(record)}}><TrashIcon className='w-4 text-red-500' /></a>
          </Space>
        ),
    },
    ],
    [
        {
          title: 'Branch Name',
          dataIndex: 'managerName',
          key: 'managerName',
          render: (text) => <a className='text-blue-800 font-medium'>{text}</a>,
        },
        {
            title: 'Manager Role',
            dataIndex: 'managerRole',
            key: 'managerRole',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ManagerSignature',
            dataIndex: 'managerSignature',
            key: 'managerSignature',
            render: (text) => <a href={text} target={"_blank"} className="text-red-500">Signature</a>,
        },
        ]
]

  return (
    <div className='max-h-[80%] overflow-y-scroll'>
        <Table columns={activities[data.ind]} dataSource={data?.data}  pagination={false}  />
    </div>
  )
}
