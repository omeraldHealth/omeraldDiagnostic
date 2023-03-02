import { Spinner } from '@components/atoms/loader'
import { mailImage } from '@utils'
import React, { useState } from 'react'
import { useAuthContext } from 'utils/context/auth.context'
import { addQuery } from 'utils/hook/userDetail'
import { DynamicFormCreator } from './dynamicForm'

export const ContactForm = ({handleSubmit}:any) => {
  const {diagnosticDetails} = useAuthContext()
  const [loading,setLoading] = useState(false)

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
      setLoading(false)
    }

  }
  
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"phoneNumber","type":"text","label":"Contact","required":true},
    {"name":"message","type":"text","label":"message","required":true}
  ]

  return (
    <div>
        <section className='flex w-[100%] justify-center my-10 py-4'>
            <img src={mailImage} className="w-[25%]"/>
            <section className='w-[40%] mx-20'>
              <DynamicFormCreator buttonText="Submit" style={""} formProps={contactForm} handleSubmit={handleForm}/>
            </section>    
        </section>    
        {loading && <Spinner/>}
    </div>
  )
}
