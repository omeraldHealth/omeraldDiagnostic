import React, {useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import { DynamicFormType } from 'utils/types/molecules/forms.interface';
import LogoUploader from '@components/atoms/fileUploder/logoUploaders';
import { roles } from 'utils/static';
import { FileUploader } from '@components/atoms/fileUploder/fileUpload';
import BannerUploader from '@components/atoms/fileUploder/bannerUpload';


export const DynamicFormCreator = ({formProps,showLabel,disableElement,initial,formStyle,handleSubmit,handleImage,buttonText,selectedValue,setSelectedValue}:DynamicFormType) => {
      

    // const handleSearch = (newValue: string) => {
    //     let temp = diagnosticProfile.pathologistDetail?.filter((report:any)=> {return report.name.includes(newValue) || report.designation.includes(newValue)})
    //     setPathologist(temp)
    //   };
    
    // const {user,diagnosticDetails} = useAuthContext()
    // const debouncedSearch = debounce(handleSearch, 500);
    // const diagnosticProfile = useSelector((state:any) => state.diagnosticReducer)
    // const disabledDate = (current:any) => {return current && current > moment().endOf('day')};
    // const [pathologist, setPathologist] = useState<SelectProps['options']>(diagnosticProfile.pathologistDetail);
    const initalValue={ remember: true,...initial}

    return (
        <div>
            <Form className={formStyle} onFinish={handleSubmit} layout="vertical" name="dynamic" initialValues={initalValue}>
                {/* Text Fields */}
                {formProps.map((form,index) => <>
                    {form.type === "text"  && 
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                            <Input disabled={disableElement && form.name =="phoneNumber" || form.name =="branchContact"} placeholder={form.label} className="border-gray-300 rounded-lg text-black font-light text-sm py-2" />
                        </Form.Item>
                    }
                     {form.type === "contact"  && 
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                            <Input placeholder={form.label} className="border-gray-300 rounded-lg text-black font-light text-sm py-2" />
                        </Form.Item>
                    }  
                    {form.type === "email" && 
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                            <Input placeholder={form.label} className="border-gray-300 lowercase rounded-lg text-black font-light text-sm py-2" />
                        </Form.Item>
                    } 
                    {form.type === "image" &&  form.name != "signature" &&
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: false,message: `Please input ${form.label}`}]}>
                            <LogoUploader handleImage={handleImage} />
                        </Form.Item>
                    }
                     {form.type === "image" && form.name ==="signature" && 
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: false,message: `Please input ${form.label}`}]}>
                            <BannerUploader text="Signature" handleImage={handleImage} />
                        </Form.Item>
                    }
                    {form.type === "textArea" && 
                        <Form.Item  
                                label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                                key={index} className='mb-6 font-bold text-lg' 
                                name={form.name} labelCol={{ span: 10 }}  
                                rules={[{ pattern: form?.pattern, required: false,message: `Please input ${form.label}`}]}>
                          <textarea className='border-gray-200 border-2 p-3 rounded-lg' rows={4} cols="49" placeholder={form.label} maxLength={1000} />
                        </Form.Item>
                    }
                    {form.type === "select" && 
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                            <Select
                                style={{ width: 380 }}
                                defaultValue={selectedValue}
                                onChange={(e)=>{setSelectedValue(e)}}
                                options={roles.map((role) => ({ label: role, value: role }))}
                            />
                        </Form.Item>
                    } 
                    {form.type === "tags" &&
                        <Form.Item  key={index} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
                        <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Aliases"
                            />
                        </Form.Item>
                        }

                </>
                )}

                 {/* Form Submit Button */}
                <Form.Item className={`flex justify-start col-span-2`}>
                    <Button className={`bg-blue-500`} type="primary" htmlType="submit">{buttonText}</Button>
                </Form.Item>  
            </Form>
        </div>
    )
}




     {/* <Form className={formStyle} onFinish={handleSubmit}  layout="vertical" name="basic" 
        initialValues={init}>
        {formProps.map((form,index) => <>
                {form.type === "text" && 
                <Form.Item label={label && <span style={{ color: 'red' }}>{form.name}</span>} key={index} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                   {form.name !== "phoneNumber" && form.type == "text" ? <Input placeholder={form.label}   disabled={isDisabled } className="border-gray-400 rounded-lg  text-black font-light text-sm" />:
                   <Input   disabled={isDisabled || disable} placeholder={form.label} className="border-gray-400 rounded-lg text-black font-light text-sm" />
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
                    />
                </Form.Item>
                }
                </>
            )}

        <Form.Item className={`flex justify-start col-span-2 ${style}`}>
            <Button className={`bg-blue-500 ${style}`} type="primary" htmlType="submit">{buttonText}</Button>
        </Form.Item>    
        </Form> */}