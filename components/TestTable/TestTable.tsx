import React from 'react'
import { Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { LoaderComp } from '../alerts/loader';
import {FormModal} from "../alerts/modal"
import { useAuth } from '@/lib/auth';

interface DataType {
  key: string;
  testName: string;
  keywords: any[];
}

const dbTests : DataType[] = [
  {
    key:"1",
    testName:"Blood Report",
    keywords:[{
      "keyword":"Hoemoglobin",
      "normalRange":"100/120",
      "unit":"ss/LL",
      "aliases":["Hemo","Himo"]
    },{
      "keyword":"RBC",
      "normalRange":"100/120",
      "unit":"ss/LL",
      "aliases":["R","RB"]
    }],
  },
]

const data: DataType[] = [
  {
    key: '1',
    testName: 'Blood Test',
    keywords:[{
      "keyword":"Hoemoglobin",
      "normalRange":"100/120",
      "unit":"ss/LL",
      "aliases":["Hemo","Himo"]
    },{
      "keyword":"RBC",
      "normalRange":"100/120",
      "unit":"ss/LL",
      "aliases":["R","RB"]
    }],
  },
  {
    key: '2',
    testName: 'Urine Test',
    keywords:[{
      "keyword":"Hoemoglobin",
      "normalRange":"100/120",
      "unit":"ss/LL",
      "aliases":["Hemo","Himo"]
    },{
      "keyword":"RBC",
      "normalRange":"100/120",
      "unit":"ss/LL",
      "aliases":["R","RB"]
    }],
  },
];

export default function TestTable({tests,handleRemove}:any){
 
  const handleEdit = (e:any) => {
    console.log(e)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Test Name',
      dataIndex: 'testName',
      key: 'testName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Keywords (Hover to see aliases)',
      key: 'keywords',
      dataIndex: 'keywords',
      render: (_, { keywords}) => (
        <>
          {keywords.map((param) => {
            return (
              <>
               <Tooltip placement="topLeft" title={param.aliases}>
                <Tag className="my-1" color={"green"} key={param}>
                  {param.keyword.toUpperCase()}
                </Tag>
              </Tooltip>
              </>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={()=>{handleEdit(record)}}><FormModal handle={handleEdit} record={record.keywords} manual={false} /></a> */}
          <a onClick={()=>{handleRemove(record)}}><TrashIcon className='w-4 text-red-500' /></a>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-[100%] bg-white h-auto min-h-[30vh] sm:min-h-[60vh] my-10 rounded-lg p-4">
      {tests ? <Table columns={columns} dataSource={tests} />: <LoaderComp/>}
    </div>
  )
}
