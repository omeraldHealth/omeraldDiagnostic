import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { useProfileValue } from "../../common/constants/constants";
import moment from "moment";

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
          render: (text:any) => <a>{text?.managerName}</a>,
          sorter: (a:any, b:any) => a.user.length - b.user.length,
      },
      {
          key: 'updatedTime',
          title: 'Activity Time',
          dataIndex: 'updatedTime',
          render: (text:any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
          sorter: (a:any, b:any) => new Date(a?.updatedTime) - new Date(b?.updatedTime),
      },
]
  
export function Activity() {

    const profile = useProfileValue();
    
	return (
        <div className="min-h-[45vh]">
            <DashboardTable columns={ActivityForm} data={profile?.activities && []} />
        </div>
    )
}


