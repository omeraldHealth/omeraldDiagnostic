import React, { useState } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
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
    setSelectedRole?: (value:any) =>void
    handleSubmit: (value:any) =>void
    handleImage?: (value:any) =>void
}

export const DynamicFormCreator = ({formProps,handleSubmit,handleImage,buttonText,style,selectedRole,setSelectedRole}:FormType) => {

  const diagnosticProfile = useSelector((state:any) => state.diagnosticReducer)
  
  const roles = ['Admin', 'Manager','Operator','Spoc'];
  
  return (
    <div className='relative'>
        <Form onFinish={handleSubmit} name="basic" 
        initialValues={{ remember: true,phoneNumber:diagnosticProfile?.phoneNumber }}>
        {formProps.map((form,index) => <>
                {form.type === "text" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ required: form.required,message: `Please input ${form.label}`}]}>
                   {form.name !== "phoneNumber" ? <Input placeholder={form.label} className="border-gray-200  text-black font-light text-sm" />:
                   <Input disabled placeholder={form.label} className="border-gray-200  text-black font-light text-sm" />
                } 
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
              </>
        )}
        <Form.Item className={`flex justify-start ${style}`}>
            <Button className={`bg-blue-500 ${style}`} type="primary" htmlType="submit">{buttonText}</Button>
        </Form.Item> 
        </Form>
    </div>
  
  );
};

