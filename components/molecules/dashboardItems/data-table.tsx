import { Table } from 'antd';
import React from 'react'


export const DashboardTable = ({columns,data}:any) => <Table pagination={false} columns={columns} dataSource={data} />;
