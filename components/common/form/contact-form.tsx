import { mailImage } from '@utils'
import React from 'react'
import DynamicFormGenerator from './dynamicForm'

export const ContactForm = () => {
  const handleForm = async (value:any) => {

  }  
  
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"message","type":"text","label":"message","required":true},
    {"name":"description","type":"description","label":"description","required":true}
  ]
  
  return (
    <div>
        <section className='flex flex-col lg:flex-row w-[100%] justify-start lg:justify-center my-10 py-2'>
            <section className='w-full md:w-[60%] lg:w-[40%] hidden md:flex'>
              <section>
              {/* <span className='text-left'>
                <p>Avin Mednologies Private Limited</p>
                <address>3-1-325/2, 3rdFloor</address>
                <address>Near AK bhavan hall Kachiguda Nimboliadda, Hyderabad 500027 TELANGANA</address>
                <p>Contact: 9769105223</p>
                <p>Email: 9769105223</p>
              </span> */}
              <img src={mailImage} className="w-[60%] lg:w-[65%] lg:m-auto"/>
              </section>
            </section>
            <section className='w-full md:w-[60%] text-left lg:w-[40%] mr-20'>
              <DynamicFormGenerator buttonText="Send Query" formProps={contactForm} handleSubmit={handleForm}/>
            </section>    
        </section>    
    </div>
  )
}
