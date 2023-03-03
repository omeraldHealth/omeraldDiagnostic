import { Spinner } from '@components/atoms/loader';
import { Table } from 'antd';
import React from 'react'


export const DashboardTable = ({columns,data}:any) => <Table pagination={{ pageSize:5,total: data.length}} rowKey={(data) => Object.keys(data)[0]}  columns={columns} dataSource={data} />;
