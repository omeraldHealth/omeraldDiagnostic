import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { useSelector } from "react-redux";

export function Activity() {
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const columns = [
        {
            key: 'sdas',
            title: 'Activity',
            dataIndex: 'activity',
            render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
          },
          {
              key: 'asse',
              title: 'Activity By',
              dataIndex: 'user',
              render: (text:any) => <a>{text.managerName}</a>,
          },
          {
              key: 'qws',
              title: 'Activity Time',
              dataIndex: 'updatedTime',
              render: (text:any) => <a>{text}</a>,
          },
    ]

	return (
        <div className="min-h-[45vh]">
            <DashboardTable columns={columns} data={diagnosticDetails?.activities} />
        </div>
    )
}

