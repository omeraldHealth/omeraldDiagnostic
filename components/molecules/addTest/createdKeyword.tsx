import { Spinner } from '@components/atoms/loader'
import { TrashIcon } from '@heroicons/react/20/solid'
import { Space, Tag } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTests } from 'utils/hook/userDetail'
import { DashboardTable } from '../dashboardItems/data-table'

export const AddKeyword = ({handleSteps}:any) => {
  const {isManual,selectedTest,testName} = useSelector((state:any)=>state.testReducer)
  const columns = [
    {
        key: 'keyword',
        title: 'Keyword',
        dataIndex: 'keyword',
        render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
      },
      {
          key: 'normalRange',
          title: 'Normal Range',
          dataIndex: 'normalRange',
          render: (text:any) => <a>{text}</a>,
      },
      {
          key: 'unit',
          title: 'Unit',
          dataIndex: 'unit',
          render: (text:any) => <a>{text}</a>,
      },
      {
        key: 'aliases',
        title: 'Aliases',
        dataIndex: 'aliases',
        render: (text:any) => text.map((t:any) => <Tag color={"green"}>{t}</Tag>),
      },
      {
            title: 'Action',
            dataIndex: 'unit',
            key: 'unit  ',
            render: (_, record:any) => (
              <Space size="middle">
                {record._id &&   <a ><TrashIcon className='w-4 text-red-500' /></a>}
              </Space>
            ),
      },
  ]
  console.log(selectedTest)
  return (
    <div>
        {
            !isManual && 
            <section>
                <DashboardTable columns={columns} data={selectedTest ? selectedTest.keywords :[]} />
            </section>
           
        }
    </div>
  )
}
