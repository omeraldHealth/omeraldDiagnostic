import { DashboardTable } from '@components/molecules/dashboardItems/data-table'
import { Fragment } from 'react'
import React from 'react'
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAuthContext } from 'utils/context/auth.context';

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
  const {diagnosticDetails} = useAuthContext()
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Test Name',
      dataIndex: 'testName',
      key: 'testName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Sample Type',
      dataIndex: 'sampleType',
      key: 'sampleType',
      render: (text) => <a>{text.sampleName}</a>,
    },
    {
      title: 'Keywords (Hover to see aliases)',
      key: 'sampleType',
      dataIndex: 'sampleType',
      render: (_, {sampleType}) => (
        <>
          {sampleType?.keywords.map((param) => {
            return (
              <>
              {console.log(sampleType)}
              {/* <Popover content={param.aliases} title={"Aliases"}> */}
                <a href='#'>
                  <Tag className="my-1" color={"green"} key={param}>
                    {param.keyword.toUpperCase()}
                  </Tag>
                </a>
              {/* </Popover> */}
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
          {/* {record?._id && <a onClick={()=>{handleRemove(record)}}><TrashIcon className='w-4 text-red-500' /></a>} */}
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
