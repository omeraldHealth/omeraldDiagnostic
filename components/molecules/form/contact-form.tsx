import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import { Spinner } from '@components/atoms/loader'
import { mailImage, sendWhatsAppQueryApi } from '@utils'
import { useAuthContext } from 'utils/context/auth.context'
import { DynamicFormCreator } from './dynamicForm'
import React, { useState } from 'react'
import { addEmailQuery, sendWhatsAppQuery } from 'utils/hook/userDetail'

export const ContactForm = ({handleSubmit,refetch}:any) => {
  const {diagnosticDetails} = useAuthContext()
  const [loading,setLoading] = useState(false)

  const handleForm = async (value:any) => {
    setLoading(true)
    
    const queryEmail = {
      "phoneNumber":diagnosticDetails?.phoneNumber,
      "name":diagnosticDetails?.diagnosticName,
      "branch": diagnosticDetails?.branchDetails?.[0].branchName,
      "email":diagnosticDetails?.email,
      "subject":value.subject,
      "message":value.message,    
    }
        
    const queryMessage =  {"text": `${diagnosticDetails?.managersDetail?.[0]?.managerName} from ${diagnosticDetails?.diagnosticName} - ${diagnosticDetails?.branchDetails?.[0].branchName} has an issue.\n${value?.subject} ${value?.message}, Kinly assist with the above query!!\nYou can connect on ${diagnosticDetails?.phoneNumber} for more details`  
    }
    
    //@ts-ignore
    const resp = await sendWhatsAppQuery(queryMessage)
      if(resp.status == 200){
          successAlert("Sent Query to support succesfully")
          const resp2 = await addEmailQuery(queryEmail)
          if(resp2.status == 200){
            successAlert("Email send to support succesfully")
          }
          refetch()
          handleSubmit()
      }else{
          errorAlert("Error updating query")
      }
    
    setLoading(false)
  }
      
  
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"message","type":"textArea","label":"message","required":true}
  ]

  return (
    <div>
        <section className='flex w-[100%] justify-center my-10 py-2'>
            <section className='w-[40%]'>
              <img src={mailImage} className="w-[65%] m-auto"/>
            </section>
            <section className='w-[40%] mr-20'>
              <DynamicFormCreator buttonText="Send Query" style={""} formProps={contactForm} handleSubmit={handleForm}/>
            </section>    
        </section>    
        {loading && <Spinner/>}
    </div>
  )
}
