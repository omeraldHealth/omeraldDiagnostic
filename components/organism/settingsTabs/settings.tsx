import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import DynamicFormGenerator from "@components/molecules/form/dynamicForm";

export function SettingsCommon({columns, data, tabName, form, handleSubmit, addElement, setAddElement, editElement, setEditElement, defaultValues}:any) {
    return (
          <section >
              <section className="min-h-[45vh]">
                  {!(addElement || editElement) ? <div className=""> 
                    <DashboardTable columns={columns} data={data ?? []} /></div>:
                    <section className="w-[100%] md:w-[50%] my-10 relative">
                      <DynamicFormGenerator defaultValues={editElement ? defaultValues : []} formProps={form} buttonText={editElement ? "update":"submit"} handleSubmit={handleSubmit} />
                    </section>
                  }
                  
              </section>
            <section className="sm:w-[100%] w-screen flex justify-start ">
                  <button onClick={()=>{setAddElement(!addElement) 
                  setEditElement(false)}} className="bg-gray-200 p-2 rounded-md">
                    {!addElement ?  "Add "+tabName : "View "+tabName}
                  </button>
              </section>
          </section>
    )
}


