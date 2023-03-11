import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import LogoUploader from '@components/atoms/fileUploder/logoUploaders';
import BannerUploader from '@components/atoms/fileUploder/bannerUpload';
import { useSelector } from 'react-redux';
import { useAuthContext } from 'utils/context/auth.context';
import { getAuth } from 'firebase/auth';
import firebaseApp from 'utils/auth/firebase';
import { FormType } from 'utils/types/molecules/forms.interface';



export const ProfileForm = ({formProps,button,formStyle,handleSubmit,handleDate,handleImage,buttonText,style,selectedRole,setSelectedRole}:FormType) => {
  const diagnosticProfile = useSelector((state:any) => state.diagnosticReducer)
  const auth = getAuth(firebaseApp);

  const roles = ['Admin', 'Manager','Operator','Spoc'];
  const plainOptions = ['Male', 'Female', 'Others'];
  
  return (
    <div >
        <Form className={formStyle} onFinish={handleSubmit} name="basic" 
            initialValues={{ remember: true,phoneNumber:auth.currentUser?.phoneNumber,
            diagnosticName: diagnosticProfile?.diagnosticName,
            email: diagnosticProfile?.email,
            facebookUrl: diagnosticProfile?.brandDetails[0].facebookUrl,
            instaUrl: diagnosticProfile?.brandDetails[0].instaUrl,
            logo: diagnosticProfile?.brandDetails[0].brandLogo
        }}>
        {formProps.map((form,index) => <>
                {form.type === "text" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                   <Input  placeholder={form.label} className="border-gray-400 rounded-lg text-black font-light text-sm" />
                </Form.Item>
                }
                {form.type === "email" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, type: "email",message: `Please input ${form.label}`}]}>
                     <Input placeholder={form.label} className="border-gray-400 rounded-lg  text-black font-light text-sm" />
                </Form.Item>
                }
                {form.type === "logo" &&
                <Form.Item  key={index} className='mb-6 w-[20vw]' name={form.name} labelCol={{ span: 10 }} >
                    <LogoUploader handleImage={handleImage} />
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

