// @ts-nocheck
import { Table } from 'antd';
import React, { useState } from 'react';

export const CommonSettingTable = ({ data, columns }) => {
  const [pageSize, setPageSize] = useState(10);

  // Add keys to each record for Ant Design's internal use
  const dataSourceWithKeys =
    data?.map((record: any, index: number) => ({
      ...record,
      key: record.key || record._id || index,
    })) || [];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <Table
        dataSource={dataSourceWithKeys}
        columns={columns}
        pagination={{
          pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onShowSizeChange: (_, size) => setPageSize(size),
          style: { marginRight: '2vw', textAlign: 'center' },
        }}
        scroll={{ x: 'max-content' }}
        className="w-full"
        bordered
        rowClassName="hover:bg-gray-100 transition-all duration-300"
      />
    </div>
  );
};
