import React from 'react'
import { Tag } from 'antd'
import { DashboardTable } from '../dashboardItems/data-table'

export const AddKeyword = ({selectedTest}:any) => {

  const columns = [
    {
      key: "keyword",
      title: "Parameter",
      dataIndex: "keyword",
      render: (text:any) => <a className="text-blue-800 font-medium">{text}</a>,
      sorter: (a:any, b:any) => a.keyword.length - b.keyword.length,
    },
    {
      key: "minRange",
      title: "Min Range",
      dataIndex: "minRange",
      render: (text:any)  => <a>{text}</a>,
      sorter: (a:any, b:any) => a.minRange.length - b.minRange.length,
    },
    {
      key: "maxRange",
      title: "Max Range",
      dataIndex: "maxRange",
      render: (text:any)  => <a>{text}</a>,
      sorter: (a:any, b:any) => a.maxRange.length - b.maxRange.length,
    },
    {
      key: "unit",
      title: "Unit",
      dataIndex: "unit",
      sorter: (a:any, b:any) => a.unit.length - b.unit.length,
      render: (text:any)  => <a>{text}</a>,
    },
    {
      key: 'aliases',
      title: 'Aliases',
      dataIndex: 'aliases',
      sorter: (a:any, b:any) => a.aliases.length - b.aliases.length,
      render: (tags: any) => {
        if (!tags || tags?.length < 1) {
          return null; // Return null instead of an empty <p></p>
        }
  
        const displayTags = tags.slice(0, 6);
        const remainingTags = tags.slice(6);
  
        return (
          <>
            {displayTags.length > 0 && (
              <>
                {displayTags.map((tag) => (
                  <Tag color={'green'} key={tag}>
                    {tag}
                  </Tag>
                ))}
                {remainingTags.length > 0 && (
                  <>
                    <Tag color={'green'}>...</Tag>
                    <Tag color={'green'}>{remainingTags.length} more</Tag>
                  </>
                )}
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <DashboardTable columns={columns} data={selectedTest ? selectedTest.keyword : [] } />
    </div>
  )
}
