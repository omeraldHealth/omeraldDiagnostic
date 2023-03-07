import { errorAlert } from '@components/atoms/alerts/alert'
import { Whatsapp } from '@components/atoms/button/whatsapp'
import { Spinner } from '@components/atoms/loader'
import { mailImage } from '@utils'
import React, { useState } from 'react'
import { useAuthContext } from 'utils/context/auth.context'
import { addQuery } from 'utils/hook/userDetail'

import { DynamicFormCreator } from './dynamicForm'

export const ContactForm = ({handleSubmit}:any) => {
  const {diagnosticDetails} = useAuthContext()
  const [loading,setLoading] = useState(false)
  const [query,setQuery] = useState('')

  const handleForm = async (value:any) => {
    setLoading(true)
    const query = {
      "phoneNumber":value.phoneNumber,
      "name":diagnosticDetails?.diagnosticName,
      "branch": diagnosticDetails?.branchDetails[0].branchName,
      "email":diagnosticDetails?.email,
      "subject":value.subject,
      "message":value.message,      
    }

    //@ts-ignore
    const resp = await addQuery(query)
    if(resp.status == 200){
  
      handleSubmit()
    
    }else{
      errorAlert("Error updating query")
    }
    setLoading(false)
  }
  
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"phoneNumber","type":"text","label":"Contact","required":true},
    {"name":"message","type":"text","label":"message","required":true}
  ]

  return (
    <div>
        <section className='flex w-[100%] justify-center my-10 py-2'>
            <section className='w-[40%]'>
              <img src={mailImage} className="w-[65%] m-auto"/>
            </section>
        
            <section className='w-[40%] mx-20'>
              <p className='text-center'>
                <Whatsapp message={"Hi, I am having a query about my diagnostic profile, could you please help?"}/>
              </p>
              <p className='text-sm text-center my-4'>OR</p> 
              <DynamicFormCreator buttonText="Send Email" style={""} formProps={contactForm} handleSubmit={handleForm}/>
            </section>    
        </section>    
        {loading && <Spinner/>}
    </div>
  )
}
