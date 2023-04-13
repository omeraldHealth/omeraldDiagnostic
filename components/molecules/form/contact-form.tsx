import { Spinner } from '@components/atoms/loader'
import { mailImage } from '@utils'
import { useAuthContext } from 'utils/context/auth.context'
import { DynamicFormCreator } from './dynamicForm'
import React, { useState } from 'react'

export const ContactForm = ({handleSubmit,refetch}:any) => {
  const {diagnosticDetails,activeBranch} = useAuthContext()
  const [loading,setLoading] = useState(false)

  const handleForm = async (value:any) => {

  }
      
  
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"message","type":"textArea","label":"message","required":true}
  ]

  return (
    <div>
        <section className='flex flex-col lg:flex-row w-[100%] justify-start lg:justify-center my-10 py-2'>
            <section className='w-full md:w-[60%] my-4 lg:w-[40%] hidden md:flex'>
              <img src={mailImage} className="w-[60%] lg:w-[65%] lg:m-auto"/>
            </section>
            <section className='w-full md:w-[60%] lg:w-[40%] mr-20'>
              <DynamicFormCreator buttonText="Send Query" style={""} formProps={contactForm} handleSubmit={handleForm}/>
            </section>    
        </section>    
        {loading && <Spinner/>}
    </div>
  )
}
