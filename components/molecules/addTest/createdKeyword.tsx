import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Modal, Space, Tag } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_TEST } from 'utils/store/types'
import { testForm } from 'utils/types/molecules/forms.interface'
import { DashboardTable } from '../dashboardItems/data-table'
import { DynamicFormCreator } from '../form/dynamicForm'

export const AddKeyword = ({selectedTest,action}:any) => {

  const { confirm } = Modal;
  const testDetails = useSelector((state:any)=>state.testReducer)
  const dispatcher = useDispatch()
  const [initialKeywords,setInitial] = useState()
  const [edit,setEdit] = useState(false)
  const columns = [
    {
        key: 'keyword',
        title: 'Parameter',
        dataIndex: 'keyword',
        render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
        sorter: (a:any, b:any) => a.keyword.length - b.keyword.length,
      },
      {
          key: 'minRange',
          title: 'Min Range',
          dataIndex: 'minRange',
          render: (text:any) => <a>{text}</a>,
          sorter: (a:any, b:any) => a.minRange.length - b.minRange.length,
      },
      {
        key: 'maxRange',
        title: 'Max Range',
        dataIndex: 'maxRange',
        render: (text:any) => <a>{text}</a>,
        sorter: (a:any, b:any) => a.maxRange.length - b.maxRange.length,
    },
      {
          key: 'unit',
          title: 'Unit',
          dataIndex: 'unit',
          sorter: (a:any, b:any) => a.unit.length - b.unit.length,
          render: (text:any) => <a>{text}</a>,
      },
      {
        key: 'aliases',
        title: 'Aliases',
        dataIndex: 'aliases',
        sorter: (a:any, b:any) => a.aliases.length - b.aliases.length,
        // render: (text:any) => text.map((t:any) => <Tag color={"green"}>{t}</Tag>),

        render: tags => {
          if(!tags && tags?.length<1){
            return <p></p>
          }

          const displayTags =tags &&  tags.slice(0, 6);
          const remainingTags =tags &&   tags.slice(6);

          return (
            <>
              {(!displayTags || displayTags?.length==0)  ?
              <p></p>:<>
                 {displayTags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
                  ))}
                  {remainingTags.length > 0 && (
                    <>
                      <Tag  color={'green'}>...</Tag>
                      <Tag color={'green'}>{remainingTags.length} more</Tag>
                    </>
                  )}
              </>}  
            </>
          );
        }
      },
  ]

  if(action){
    columns?.push(
      {
        title: 'Action',
        dataIndex: 'unit',
        key: 'unit  ',
        render: (text:any,record:any) => (
          <Space size="middle">
            {action && <a ><TrashIcon onClick={()=>{handleRemoveKeyword(record)}} className='w-4 text-red-500' /></a> }
            <a ><PencilIcon onClick={()=>{handleEdit(record)}} className='w-4 text-gray-900' /></a> 
        </Space>
        ),
  },
    )
  }

  const handleRemoveKeyword = (value:any)=>{
    confirm({
      title: 'Do you want to go back, this will clear your data?',
          content: 'The action cannot be undone.',
      onOk() {
            let keywords = testDetails?.sampleType.keywords.filter((keyword:any)=>keyword?.keyword !== value?.keyword)

            let sampleType = {
                testName:testDetails?.sampleType?.testName,
                keywords:keywords
            }
            dispatcher({type:SET_TEST,payload:{testDetails,"sampleType":sampleType}})
            warningAlert("Keyword removed succesfully")
      }
    }) 
  }

  const handleEdit = (value:any)=>{
    let initial = {
      "keyword": value?.keyword,
      "aliases":value?.aliases,
      "unit":value?.unit,
      "minRange":value?.minRange,
      "maxRange":value?.maxRange,
      "_id":value._id
    }

    setInitial(initial)
    setEdit(true)
  }

  const handleEditKeyword = (value:any) => {
    let duplicate = testDetails?.sampleType?.keywords.some((keyword:any) => (keyword.keyword === initialKeywords?.keyword && keyword.keyword === value?.keyword)  )
    let count = 0
        testDetails?.sampleType?.keywords.forEach((keyword:any) =>{ 
          if(keyword.keyword == value.keyword){
              ++count;
          }
        } )
    
    if(count>1){
      errorAlert("Keyword by name exists already")
    }else{
      let keywords = testDetails?.sampleType.keywords?.map((keyword) => {
        if(keyword.keyword === initialKeywords?.keyword){
          return value
        }else{
          return keyword
        }
      });

      let sampleType = {
          testName:testDetails?.sampleType?.testName,
          keywords:keywords
      }
      dispatcher({type:SET_TEST,payload:{testDetails,"sampleType":sampleType}})
      successAlert("Keyword Added succesfully")
      setEdit(false)
    }
  }

  return (
    <div>
        {
            <section>
                 {!edit ?<DashboardTable initalValue={initialKeywords} columns={columns} data={selectedTest ? selectedTest.keywords :[]} />
              :<section className='w-[60%]'>
                <DynamicFormCreator initial={initialKeywords} formProps={testForm} buttonText="continue" handleSubmit={handleEditKeyword} />
                <button onClick={()=>{setEdit(false)}} className='bg-red-600 text-white px-2 py-1 rounded-md'>Cancel</button>
              </section>}
            </section>
        }
    </div>
  )
}
