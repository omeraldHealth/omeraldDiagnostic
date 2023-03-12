import { errorAlert, successAlert } from "@components/atoms/alerts/alert"
import { TitleText_2 } from "@components/atoms/font"
import { Spinner } from "@components/atoms/loader"

import { ReportDetails, UserDetails } from "@utils"
import { Modal } from "antd"
import { useState } from "react"
import { QueryClient } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { createReport, updateUserDetails, uploadReport } from "utils/hook/userDetail"
import { SET_REPORT, SET_REPORT_FORM, SET_REPORT_LIST } from "utils/store/types"
import PdfTesting from "../PdfTesting/PdfTesting"


export const ReportSummary =({handleSteps}:any) => {
    const reportForm = useSelector((state:any)=>state.reportFormReducer)
    const [loading,setLoading] = useState(false)
    const diagnosticDetails = useSelector((state:any)=> state.diagnosticReducer)
    const dispatch = useDispatch()
    const queryClient = new QueryClient()
    const handleSubmit = async () => {
        setLoading(true)
        if(reportForm && reportForm.isManualReport){
            const resp2 = await createReport(diagnosticDetails?.phoneNumber as string,reportForm);
            if(resp2.status==200){
                    const resp3 = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"reports":[...diagnosticDetails.reports,resp2.data[0]._id]})

                      handleSteps && handleSteps(3)
                      queryClient.invalidateQueries({ queryKey: ['reports'] })
                      setLoading(false)
                      successAlert("Report updated sucessfully ")
                      dispatch({type:SET_REPORT_FORM,payload:null})
                    
            }else{
                errorAlert("Error updating report, please try again")
                setLoading(false)
            }
        }else{

            const resp = await uploadReport(reportForm.reportUrl)

            if(resp.status==200){
                reportForm["reportUrl"] = resp?.data.location
                const resp2 = await createReport(diagnosticDetails?.phoneNumber as string,reportForm);
                if(resp2.status==200){
                    handleSteps && handleSteps(3)
                    queryClient.invalidateQueries({ queryKey: ['reports'] })
                    setLoading(false)
                    successAlert("Report updated sucessfully ")
                    dispatch({type:SET_REPORT_FORM,payload:null})
                }else{
                    errorAlert("Error updating report, please try again")
                    setLoading(false)
                }
            }else{
                errorAlert("Error updating image, please try again")
                setLoading(false)
            }
        }
      
    }

    const { confirm } = Modal;
  return (
    <div>
         <section className="w-[100%] min-h-[50vh] max-h-[70vh] relative ">
            <p>Report Summary</p>
            <section className="grid grid-cols-2 my-4 gap-x-10 relative">
                {
                    Object.keys(reportForm).map((key)=>{
                        {
                            if(reportForm[key] && reportForm[key]?.length>0 && key!='userId' && key!='reportUrl'){
                                return  <p className="my-2 font-bold capitalize border-2 p-2 grid grid-cols-2 justify-between ">{key}: <span className="font-light">{reportForm[key]}</span></p>
                            }
                        }
                    })
                }
            </section>
            {reportForm.parsedData && reportForm?.isManualReport &&<section  >
                    <p className="my-2">Parsed Data</p>
                    <section className="grid  grid-cols-3 my-2 gap-x-10 ">
                    {
                        Object.keys(reportForm?.parsedData).map((key)=>{
                            {
                                return  <p className="my-2 capitalize rounded-xl border-gray-50 border-2 p-2 grid grid-cols-2 justify-between ">{key}: <span className="font-light">{
                                    reportForm.parsedData[key]}</span></p>
        
                            }
                        })
                    }  
                    </section>
            </section>}
            <section className="absolute right-2 bottom-0">
                <button onClick={()=>{
                     confirm({
                        title: 'Do you want to go back?',
                        content: 'Your data will be cleared, the action cannot be undone.',
                        onOk() {
                          // Handle the user's confirmation
                          handleSteps && handleSteps(1)
                        },
                        onCancel() {
                          // Handle the user's cancellation
                        },
                      })
                }} className="p-2 bg-gray-400 text-white w-[4vw] mx-2 rounded-lg">Back</button>
                <button onClick={handleSubmit} className="px-2 py-2 bg-indigo-600 mx-4 text-white bottom-0 rounded-lg">Submit</button>
            </section>
            {loading && <Spinner/>}
        </section>
    </div>
  )
}


