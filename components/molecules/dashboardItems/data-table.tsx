import { InputNumber, Pagination, Table } from 'antd'
import React, { useState } from 'react'

export const DashboardTable = ({columns,data,pageSize}:any) => {

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    showQuickJumper: true,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        {/* <Table
          pagination={pagination} // Pass the pagination object to the Table component
          onChange={handlePaginationChange} // Pass the handlePaginationChange function to the onChange prop of the Table component 
          rowKey={(data) => data?._id || Math.floor(Math.random() * 1000000).toString()}  
          columns={columns} dataSource={data} 
          // footer={() => ( // Render the page jumper component in the table footer
          //   <Pagination showQuickJumper defaultCurrent={2} total={500}  /> 
          // )}
          dataSource={data}
          sortOrder="ascend"
          scroll={{ x: 'max-content' }}
          className="my-pagination-class" 
          /> */}
           <Table
              dataSource={data}
              columns={columns}
              pagination={pagination}
              onChange={handleTableChange}
              className="my-pagination-class" // Add a string value to the className property of the pagination component
              rowKey={(data) => data?._id || Math.floor(Math.random() * 1000000).toString()}  
              sortOrder="ascend"
              scroll={{ x: 'max-content' }}
            />
      </div>
  )
}
