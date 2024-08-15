import { Table, TablePaginationConfig } from "antd";
import React, { useState, ChangeEvent } from "react";

interface DashboardTableProps {
  columns: any[];
  data: any[];
  pageSize?: number;
}

export const DashboardTable: React.FC<DashboardTableProps> = ({
  columns,
  data,
  pageSize = 6,
}: DashboardTableProps) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: pageSize,
    showQuickJumper: true,
  });

  // Handle changes in the table (pagination, filters, sorter, extra)
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
    extra: any,
  ) => {
    setPagination({
      ...pagination,
    });
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table
        dataSource={data || []}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        className="my-pagination-class"
        rowKey={(data) => data?._id || generateUniqueKey()}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

// Function to generate a unique key
const generateUniqueKey = (): string => {
  // Implement your logic to generate a unique key (e.g., using UUID)
  return Math.floor(Math.random() * 1000000).toString();
};
