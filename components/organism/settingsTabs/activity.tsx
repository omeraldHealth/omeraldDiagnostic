import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { useAuthContext } from "utils/context/auth.context";

export function Activity() {
    const {diagnosticDetails} = useAuthContext()
    const columns = [
        {
            title: 'Activity',
            dataIndex: 'activity',
            key: 'activity',
            render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
          },
          {
              title: 'Activity By',
              dataIndex: 'user',
              key: 'user',
              render: (text:any) => <a>{text.managerName}</a>,
          },
          {
              title: 'Activity Time',
              dataIndex: 'updatedTime',
              key: 'updatedTime',
              render: (text:any) => <a>{text}</a>,
          },
    ]

	return (
        <div className="min-h-[45vh]">
            <DashboardTable columns={columns} data={diagnosticDetails?.activities} />
        </div>
    )
}

