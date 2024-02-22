import { DashboardTable } from "@components/molecules/dashboardItems/data-table";


export function SettingsCommon({columns,data}:any) {
    return (
          <section >
              <div className="min-h-[45vh]">
                <DashboardTable columns={columns} data={data ?? []} />
              </div>
              {/* <section className="min-h-[45vh]">
                  {!addElement ? <div className=""> 
                    <DashboardTable columns={columns} data={data} /></div>:
                    <section className="w-[100%] md:w-[50%] my-10 relative">
                      <DynamicFormCreator setSelectedValue={setSelectedValue} handleImage={handleImage} selectedValue={selectedValue} initial={edit && initialData} handleSubmit={handleSubmit} buttonText={edit?"update":"submit"} formProps={settingsForm}  />
                    </section>
                  }
              </section>
            <section className="sm:w-[100%] w-screen flex justify-start ">
                  <button onClick={()=>{setAddElement(!addElement) 
                  setEdit(false)}} className="bg-gray-200 p-2 rounded-md">
                    {!addElement ?  "Add "+tabName : "View "+tabName}
                  </button>
              </section> */}
          </section>
    )
}


