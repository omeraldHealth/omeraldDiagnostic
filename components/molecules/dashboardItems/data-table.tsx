import { Spinner } from '@components/atoms/loader';
import { Pagination, Table } from 'antd';
import React from 'react'


export const DashboardTable = ({columns,data,pageSize}:any) => 
<Table 
    sortOrder="ascend"
    pagination={{ pageSize: pageSize || 5,total: data?.length}} 
    rowKey={(data,index) => {data?._id ? data?.id: index?.toString()}}  
    columns={columns} dataSource={data} 
/>;


