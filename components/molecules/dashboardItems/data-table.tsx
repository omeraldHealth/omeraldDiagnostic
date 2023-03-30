import { Spinner } from '@components/atoms/loader';
import { Pagination, Table } from 'antd';
import React from 'react'


export const DashboardTable = ({columns,data,pageSize}:any) => 

<div style={{ width: '100%', overflowX: 'auto' }}>
  <Table 
    sortOrder="ascend"
    pagination={{ pageSize: pageSize || 5,total: data?.length}} 
    rowKey={(data) => Object.keys(data)[0]}  
    columns={columns} 
    dataSource={data} 
    scroll={{ x: true }}
  />
</div>



