import { successAlert } from '@components/atoms/alerts/alert'
import { Spinner } from '@components/atoms/loader'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { success } from '@styles/styleTemplate/color'
import { Modal, Space, Tag } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTests } from 'utils/hook/userDetail'
import { SET_TEST } from 'utils/store/types'
import { DashboardTable } from '../dashboardItems/data-table'

export const AddKeyword = ({handleSteps,action}:any) => {
  const {isManual,selectedTest,testName} = useSelector((state:any)=>state.testReducer)
  const { confirm } = Modal;
  const columns = [
    {
        key: 'keyword',
        title: 'Parameter',
        dataIndex: 'keyword',
        render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
      },
      {
          key: 'minRange',
          title: 'Min Range',
          dataIndex: 'minRange',
          render: (text:any) => <a>{text}</a>,
      },
      {
        key: 'maxRange',
        title: 'Max Range',
        dataIndex: 'maxRange',
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
        // render: (text:any) => text.map((t:any) => <Tag color={"green"}>{t}</Tag>),

        render: tags => {
          const displayTags = tags.slice(0, 6);
          const remainingTags = tags.slice(6);
          return (
            <>
              {displayTags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {remainingTags.length > 0 && (
                <>
                  <Tag>...</Tag>
                  <Tag>{remainingTags.length} more</Tag>
                </>
              )}
            </>
          );
        }
      },
      {
            title: 'Action',
            dataIndex: 'unit',
            key: 'unit  ',
            render: (text:any,record:any) => (
              <Space size="middle">
                {action && <a ><TrashIcon onClick={()=>{handleDelete(record)}} className='w-4 text-red-500' /></a> }
                {/* <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a>  */}
            </Space>
            ),
      },
  ]
  const dispatch = useDispatch()
  // ((state:any)=>state.testReducer)

  const handleDelete = (value:any)=>{
    confirm({
      title: 'Do you want to go back, this will clear your data?',
          content: 'The action cannot be undone.',
      onOk() {
        let newArr = selectedTest?.keywords.filter((key:any)=>key.keyword !== value.keyword)
        dispatch({type:SET_TEST,payload:{selectedTest:{"keywords":newArr}}})
        successAlert("Keyword removed Sucesfully")
      }
    }) 
  }
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
