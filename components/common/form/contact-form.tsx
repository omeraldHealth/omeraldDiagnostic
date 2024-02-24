import { mailImage } from '@utils'
import React from 'react'
import DynamicFormGenerator from './dynamicForm'

export const ContactForm = () => {
  const handleForm = async (value:any) => {

  }  
  
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"message","type":"text","label":"message","required":true}
  ]
  
  return (
    <div>
        <section className='flex flex-col lg:flex-row w-[100%] justify-start lg:justify-center my-10 py-2'>
            <section className='w-full md:w-[60%] my-4 lg:w-[40%] hidden md:flex'>
              <img src={mailImage} className="w-[60%] lg:w-[65%] lg:m-auto"/>
            </section>
            <section className='w-full md:w-[60%] text-left lg:w-[40%] mr-20'>
              <DynamicFormGenerator buttonText="Send Query" formProps={contactForm} handleSubmit={handleForm}/>
            </section>    
        </section>    
    </div>
  )
}
