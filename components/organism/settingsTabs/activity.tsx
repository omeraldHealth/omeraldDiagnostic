import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import moment from "moment";
import { useSelector } from "react-redux";

export function Activity() {
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const managersList = diagnosticDetails?.managersList?.map((manager:any)=> manager?.managerName )
    const ActivityForm  = [   
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
              onFilter: (value: string, record:any) => record.user.managerName.indexOf(value) === 0,
          },
          {
              key: 'qws',
              title: 'Activity Time',
              dataIndex: 'updatedTime',
              render: (text:any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
              //@ts-ignore
              sorter: (a:any, b:any) => new Date(a.updatedTime) - new Date(b.updatedTime),
         
          },
    ]
      
	return (
        <div className="min-h-[45vh]">
            {/* <DashboardTable columns={ActivityForm} data={diagnosticDetails?.activities} /> */}
        </div>
    )
}


