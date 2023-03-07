import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

export function Activity() {
   
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    let managersList = []
    const managers = diagnosticDetails?.managersDetail.forEach((man:any) => {
        const obj = { 
          text: man.managerName, 
          value: man.managerName 
        };
        managersList.push(obj)
      });
    const columns = [   
        {
            key: 'sdas',
            title: 'Activity',
            dataIndex: 'activity',
            render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
            sorter: (a:any, b:any) => a.activity.length - b.activity.length,
          },
          {
              key: 'user',
              title: 'Activity By',
              dataIndex: 'user',
              render: (text:any) => <a>{text.managerName}</a>,
              sorter: (a:any, b:any) => a.user.length - b.user.length,
              filters: managersList,
              onFilter: (value: string, record) => record.user.managerName.indexOf(value) === 0,
          },
          {
              key: 'qws',
              title: 'Activity Time',
              dataIndex: 'updatedTime',
              render: (text:any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
              sorter: (a:any, b:any) => new Date(a.updatedTime) - new Date(b.updatedTime),
         
          },
    ]

	return (
        <div className="min-h-[45vh]">
            <DashboardTable columns={columns} data={diagnosticDetails?.activities} />
        </div>
    )
}


