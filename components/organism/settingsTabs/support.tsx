import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { ContactForm } from "@components/molecules/form/contact-form";
import { useState } from "react";
import { SupportForm } from "utils/static";

export function Support() {
    const [query,setQuery] = useState(false);

    let queries:any = [];

    const handleSubmit = () =>{
        // ActivityLogger("Sent a query to omerald support")
    }

	return (
        <section>
                {/* Query Table */}
                <section className="min-h-[45vh]">
                    {!query ? <div className=""> <DashboardTable columns={SupportForm} data={queries} /></div>:<ContactForm handleSubmit={handleSubmit}/>}
                </section>
                {/* Toggle Button */}
                <section className="w-[100%] flex justify-start">
                    <button onClick={()=>{setQuery(!query)}} className="bg-gray-200 p-2 rounded-md">{!query ?  "Add Query" : "View Queries"}</button>
                </section>
        </section>
    )
}

