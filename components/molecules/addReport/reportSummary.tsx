import { errorAlert, successAlert } from "@components/atoms/alerts/alert"
import { Spinner } from "@components/atoms/loader"
import { usePDF } from "@react-pdf/renderer"
import { ReportDetails, UserDetails } from "@utils"
import { Modal } from "antd"
import { useEffect, useState } from "react"
import { QueryClient, useQueryClient } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { useAuthContext } from "utils/context/auth.context"
import { createReport, uploadReport } from "utils/hook/userDetail"
import { useUpdateDiagnostic, useUpdateReports, useUploadReportFile } from "utils/reactQuery"
import { SET_REPORT_FORM } from "utils/store/types"
import PdfTesting from "../PdfTesting/PdfTesting"

export const ReportSummary =({handleSteps}:any) => {

    const reportForm = useSelector((state:any)=>state.reportFormReducer)
    const {diagnosticDetails} = useAuthContext();
    const [loading,setLoading] = useState(false)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const [instance, updateInstance] = usePDF({
        document: (
          //@ts-ignore
          <PdfTesting report={reportForm} diagnosticDetails={diagnosticDetails} />
        ),
    });


    const updateDiagnostic = useUpdateDiagnostic({
        onSuccess: (data) => {
            handleSteps && handleSteps(3)
            setLoading(false)
            successAlert("Report updated sucessfully ")
            queryClient.invalidateQueries("getReports")
            dispatch({type:SET_REPORT_FORM,payload:null})
        },
        onError: (error) => {
          successAlert("Error adding reports")
        },
    });

    const addReports = useUpdateReports({
        onSuccess: (data) => {
            queryClient.invalidateQueries("getReports")
            if(data && diagnosticDetails){
                //@ts-ignore
                updateDiagnostic.mutate({data:{"reports":[...diagnosticDetails?.reports,data?.data[0]._id]},phoneNumber:diagnosticDetails?.phoneNumber})
            }
        },
        onError: (error) => {
          successAlert("Error adding reports")
        },
    });

    const uploadReportFile = useUploadReportFile({
        onSuccess: (data:any) => {
            reportForm["reportUrl"] = data?.data.location
            reportForm.userId = diagnosticDetails?.phoneNumber.split(" ").join("");
            addReports.mutate(reportForm)
        },
        onError: (error) => {
          errorAlert("Error uploading report")
          setLoading(false)
        },
    });

    const handleSubmit = async () => {
        setLoading(true)
        if(reportForm && reportForm.isManualReport){
            // reportForm.userId = diagnosticDetails?.phoneNumber.split(" ").join("");
            
            // addReports.mutate(reportForm)
               // Fetch blob data from URL
               const formData = new FormData()
                const response = await fetch(instance.url);
                const blob = await response.blob();

        // Convert blob to FormData

        formData.append('file', new File([blob], 'filename.pdf'));
        uploadReportFile.mutate(formData)
        }else{
            const formData = new FormData()
            formData.append("file",reportForm.reportUrl)
            uploadReportFile.mutate(formData)
        }
    }

    const { confirm } = Modal;

  return (
    <div>
         <section className="w-[100%] min-h-[50vh] max-h-[70vh] relative ">
            <p>Report Summary</p>
            <section className="grid grid-cols-2 my-1 gap-x-4 relative">
                {
                    Object.keys(reportForm).map((key)=>{
                        {
                            if(reportForm[key] && reportForm[key]?.length>0 && key!='userId' && key!='reportUrl'){
                                return  <p className="my-2 font-bold text-sm capitalize border-2 p-1 grid grid-cols-2 justify-between ">{key}: <span className="font-light text-xs">{reportForm[key]}</span></p>
                            }
                        }
                    })
                }
            </section>
            {reportForm.parsedData && reportForm?.isManualReport &&<section  >
                    <p className="my-2 font-light text-sm underline">Report Data</p>
                    <section className="grid  grid-cols-12 my-1 gap-x-4 ">
                    {
                        Object.keys(reportForm?.parsedData).map((key,index)=>{
                            {
                                return  <p key={key} className="my-2  capitalize rounded-xl border-gray-50 border-2 p-1  font-light text-sm grid grid-cols-2 justify-between ">{key}: <span className="font-light">{
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


