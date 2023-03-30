import { Spinner } from '@components/atoms/loader';
import { Pagination, Table } from 'antd';
import React from 'react'


export const DashboardTable = ({columns,data,pageSize}:any) => 
<Table 
    sortOrder="ascend"
    pagination={{ pageSize: pageSize || 5,total: data?.length}} 
    rowKey={(data) => data?._id || Math.floor(Math.random() * 1000000).toString()}  
    columns={columns} dataSource={data} 
/>;


