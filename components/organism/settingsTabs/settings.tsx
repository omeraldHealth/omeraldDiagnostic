import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import { DynamicFormCreator } from "@components/molecules/form/dynamicForm";


export function SettingsCommon({tabName,tabIndex,data,columns,edit,initialData,handleImage,handleSubmit,settingsForm,setEdit,setAddElement,addElement,selectedValue,setSelectedValue}:any) {
    return (
          <section >
              <section className="min-h-[45vh]">
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
              </section>
          </section>
    )
}


