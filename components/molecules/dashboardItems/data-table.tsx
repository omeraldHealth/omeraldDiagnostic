import { Table } from 'antd';
import React from 'react'


export const DashboardTable = ({columns,data}:any) => <Table rowKey={(data) => Object.keys(data)[0]} pagination={false} columns={columns} dataSource={data} />;
