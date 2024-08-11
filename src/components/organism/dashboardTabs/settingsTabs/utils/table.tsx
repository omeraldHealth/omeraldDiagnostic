import { Table } from 'antd';
import React, { useState } from 'react';

export const CommonSettingTable = ({data, columns}) => {
   const [pageSize, setPageSize] = useState(10);

   const dataSourceWithKeys =
   data?.length > 0 &&
   data.map((record: any, index) => ({
     ...record,
     key: record.key || record.id || index,
   }));

  return (
    <div className='sdsa'>
        <Table
            //@ts-ignore
            dataSource={
              dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
            }
            columns={columns}
            pagination={{
              pageSize,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              onShowSizeChange: (_, size) => setPageSize(size),
              style: {
                marginRight: '2vw',
                textAlign: 'center',
              },
            }}
            scroll={{ x: 'max-content' }}
          />
    </div>
  );
};


