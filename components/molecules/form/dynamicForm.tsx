import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import LogoUploader from '@components/atoms/file/logoUploaders';
import BannerUploader from '@components/atoms/file/bannerUpload';
import { useSelector } from 'react-redux';
import { useAuthContext } from 'utils/context/auth.context';
import { getAuth } from 'firebase/auth';
import firebaseApp from 'utils/auth/firebase';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import moment from 'moment';
import { debounce } from 'lodash';
interface FormProps  {
    name:string,
    type:string,
    label:string,
    required:boolean,
    pattern:RegExp,
}

interface FormType  {
    formProps: FormProps[],
    buttonText: string,
    style?:string,
    selectedRole?:string,
    formStyle?:string,
    button?:Boolean,
    initial?:Initial,
    disable?:Boolean,
    setSelectedRole?: (value:any) =>void
    handleSubmit: (value:any) =>void
    handleImage?: (value:any) =>void
    handleDate?: (value:any) => void
}

export const DynamicFormCreator = ({formProps,button,disable,initial,formStyle,handleSubmit,handleDate,handleImage,buttonText,style,selectedRole,setSelectedRole}:FormType) => {
  const diagnosticProfile = useSelector((state:any) => state.diagnosticReducer)
  const auth = getAuth(firebaseApp);

  const [isDisabled,setDisabled] = useState(false);
  const disabledDate = (current:any) => {
    return current && current > moment().endOf('day');
  };

  useEffect(()=>{
    if(disable){
        setDisabled(true)
    }
  },[])

  const [datas, setData] = useState<SelectProps['options']>(diagnosticProfile.pathologistDetail);
  const handleSearch = (newValue: string) => {
    let temp = diagnosticProfile.pathologistDetail?.filter((report:any)=> {return report.name.includes(newValue) || report.designation.includes(newValue)})
    setData(temp)
};

const debouncedSearch = debounce(handleSearch, 500);

  const roles = ['Admin', 'Manager','Operator','Spoc'];
  const plainOptions = ['Male', 'Female', 'Others'];
  let init={ remember: true}
  init = {...init,...initial}
  return (
    <div >
        <Form className={formStyle} onFinish={handleSubmit} name="basic" 
        initialValues={init}>
        {formProps.map((form,index) => <>
                {form.type === "text" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                   {form.name !== "phoneNumber" && form.type == "text" ? <Input placeholder={form.label}   disabled={isDisabled} className="border-gray-400 rounded-lg  text-black font-light text-sm" />:
                   <Input   disabled={isDisabled} placeholder={form.label} className="border-gray-400 rounded-lg text-black font-light text-sm" />
                } 
                </Form.Item>
                }
                {form.type === "contact" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                     <Input onChange={(event)=>{
                        if(event.target.value.length>9 && event.target.value.length<13){
                           setDisabled(false)
                        }else{  setDisabled(true)}
                     }} placeholder={form.label} className="border-gray-400 rounded-lg  text-black font-light text-sm" />
                </Form.Item>
                }
                {form.type === "email" && 
                <Form.Item key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, type: "email",message: `Please input ${form.label}`}]}>
                     <Input   disabled={isDisabled} placeholder={form.label} className="border-gray-400 rounded-lg  text-black font-light text-sm" />
                </Form.Item>
                }
                {form.type === "logo" &&
                <Form.Item  key={index} className='mb-6 w-[20vw]' name={form.name} labelCol={{ span: 10 }} >
                    <LogoUploader handleImage={handleImage} />
                </Form.Item>
                }
                {form.type === "banner" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                    <BannerUploader handleImage={handleImage} />
                </Form.Item>
                }
                {form.type === "roles" &&
                <Form.Item  key={index} className='mb-6 flex justify-start' name={form.name} labelCol={{ span: 0 }} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]} >
                        <Select
                            style={{ width: 220 }}
                            defaultValue={selectedRole}
                            onChange={setSelectedRole}
                            options={roles.map((role) => ({ label: role, value: role }))}
                        />

                </Form.Item>
                }
                {form.type === "pathologist" &&
                <Form.Item  key={index} className='mb-6  col-span-1' name={form.name} labelCol={{ span: 0 }} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                         <Select
                                showSearch
                            // value={value}
                            disabled={isDisabled}
                            style={{ width:340}}
                            defaultValue={"Select Pathologist"}
                            className="w-[16vw]"
                            placeholder={"Test Name"}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={debouncedSearch}
                            onChange={handleDate}
                            notFoundContent={null}
                            options={datas?.map((path:any) => ({ label: path.name+" ("+path.designation+")", value: path.name }))}
                        />
                </Form.Item>
                }
                {form.type === "date" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                       <DatePicker disabled={isDisabled} disabledDate={disabledDate} format='YYYY-MM-DD' className='w-[20vw] py-2 border-gray-400 rounded-lg' placeholder={form.label} onChange={handleDate} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}/>
                </Form.Item>
                }
                {form.type === "gender" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                    <Radio.Group   disabled={isDisabled} options={plainOptions} onChange={handleDate} value={"male"} />
                </Form.Item>
                }
                {form.type === "textArea" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                     <textarea   disabled={isDisabled} className='border-gray-200 rounded-lg' rows={4} cols="36" placeholder={form.label} maxLength={6} />
                </Form.Item>
                }
                {form.type === "tags" &&
                <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                   <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Aliases"
                        // onChange={handleChange}
                        // options={options}
                    />
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

