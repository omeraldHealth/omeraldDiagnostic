import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { FormModal } from '../alerts/modal';
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

interface KeywordType {
    keyword: string;
    aliases: any[];
    normalRange:string,
    unit:string,
    _id:string
}



export default function KeywordTable({keywords,updateKeyword}:any){
   
  const {diagnosticDetails} = useAuth()
  const [data,setData] = useState(keywords.keywords)

  const handle = (keyword:any) => {
    let keyArr = keywords.keywords?.filter((key:any) => key._id !== keyword?._id)
    keyArr.push(keyword)
    setData(keyArr)

    updateKeyword(keyArr)
    // console.log()
    // let tests = diagnosticDetails?.tests.filter(test => test._id == keywords.keywords._id);
    // console.log(tests)

  }


  const columns: ColumnsType<KeywordType> = [
    {
      title: 'Keyword',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Normal Range',
      dataIndex: 'normalRange',
      key: 'normalRange',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Aliases',
      key: 'aliases',
      dataIndex: 'aliases',
      render: (text) => <a>{text}</a>,
      // render: (_, { aliases}) => (
      //   <>
      //     {aliases.map((param) => {
      //       return (
      //         <>
      //             <span>{param},</span>
      //         </>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
            <FormModal handle={handle} record={record} />
        </Space>
      ),
    },
  ];

  

  return (
    <div className="w-[100%] bg-white h-auto min-h-[20vh] sm:min-h-[40vh] rounded-lg p-4">
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
