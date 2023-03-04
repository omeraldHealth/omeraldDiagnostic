import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import LogoUploader from '@components/atoms/file/logoUploaders';
import BannerUploader from '@components/atoms/file/bannerUpload';
import { useSelector } from 'react-redux';

interface FormProps  {
    name:string,
    type:string,
    label:string,
    required:boolean,
}

interface FormType  {
    formProps: FormProps[],
    buttonText: string,
    style?:string,
    selectedRole?:string,
    formStyle?:string,
    button?:Boolean,
    setSelectedRole?: (value:any) =>void
    handleSubmit: (value:any) =>void
    handleImage?: (value:any) =>void
    handleDate?: (value:any) => void
}

export const DynamicFormCreator = ({formProps,button,formStyle,handleSubmit,handleDate,handleImage,buttonText,style,selectedRole,setSelectedRole}:FormType) => {
    console.log(formProps)
  const diagnosticProfile = useSelector((state:any) => state.diagnosticReducer)
  
  const roles = ['Admin', 'Manager','Operator','Spoc'];
  const plainOptions = ['Male', 'Female', 'Others'];
  
  return (
    <div >
        <Form className={formStyle} onFinish={handleSubmit} name="basic" 
        initialValues={{ remember: true,phoneNumber:diagnosticProfile?.phoneNumber }}>
        {formProps.map((form,index) => <>
                {form.type === "text" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ required: form.required,message: `Please input ${form.label}`}]}>
                   {form.name !== "phoneNumber" && form.type == "text" ? <Input placeholder={form.label} className="border-gray-200  text-black font-light text-sm" />:
                   <Input disabled placeholder={form.label} className="border-gray-200  text-black font-light text-sm" />
                } 
                </Form.Item>
                }
                {form.type === "contact" && 
                

                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ required: form.required,message: `Please input ${form.label}`}]}>
                     <Input placeholder={form.label} className="border-gray-200  text-black font-light text-sm" />
                </Form.Item>
                }
                {form.type === "logo" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 10 }} >
                    <LogoUploader handleImage={handleImage} />
                </Form.Item>
                }
                {form.type === "banner" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                    <BannerUploader handleImage={handleImage} />
                </Form.Item>
                }
                {form.type === "roles" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                        <Select
                            style={{ width: 120 }}
                            defaultValue={selectedRole}
                            onChange={setSelectedRole}
                            options={roles.map((role) => ({ label: role, value: role }))}
                        />
                </Form.Item>
                }
                {form.type === "pathologist" &&
                <Form.Item  key={index} className='mb-6  col-span-1' name={form.name} labelCol={{ span: 0 }} >
                        <Select
                            style={{ width:340}}
                            defaultValue={"Select Pathologist"}
                            onChange={handleDate}
                            options={diagnosticProfile?.pathologistDetail.map((path:any) => ({ label: path.name, value: path._id }))}
                        />
                </Form.Item>
                }
                {form.type === "date" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                       <DatePicker format='YYYY-MM-DD' className='w-[20vw] py-2' placeholder={form.label} onChange={handleDate} />
                </Form.Item>
                }
                {form.type === "gender" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                    <Radio.Group options={plainOptions} onChange={handleDate} value={"male"} />
                </Form.Item>
                }
                {form.type === "textArea" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                     <textarea className='border-gray-200' rows={4} cols="36" placeholder={form.label} maxLength={6} />
                </Form.Item>
                }
              </>
        )}
        <Form.Item className={`flex justify-start col-span-2 ${style}`}>
            <Button className={`bg-blue-500 ${style}`} type="primary" htmlType="submit">{buttonText}</Button>
        </Form.Item>    
        </Form>
    </div>
  );
};

