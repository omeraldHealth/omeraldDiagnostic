import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { ActivityForm } from "utils/static";

export function Activity() {
    let activities:any = []
	return (
        <div className="min-h-[45vh]">
            <DashboardTable columns={ActivityForm} data={activities} />
        </div>
    )
}


