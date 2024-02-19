import { Table } from 'antd';
import React, { useState } from 'react';

export const DashboardTable = ({ columns, data, pageSize }: any) => {

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize || 6, // Set a default pageSize if not provided
    showQuickJumper: true,
  });

  const handleTableChange = ({pagination, filters, sorter, extra}:any) => {
    setPagination({
      ...pagination,
    });
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        className="my-pagination-class"
        rowKey={(data) => data?._id || Math.floor(Math.random() * 1000000).toString()}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
