import React from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import { DynamicFormType } from 'utils/types/molecules/forms.interface';
import LogoUploader from '@components/atoms/fileUploder/logoUploaders';
import { roles } from 'utils/static';
import { FileUploader } from '@components/atoms/fileUploder/fileUpload';
import BannerUploader from '@components/atoms/fileUploder/bannerUpload';


export const DynamicFormCreator = ({formProps,button=true,showLabel,disableElement,initial,formStyle,handleSubmit,handleImage,buttonText,selectedValue,setSelectedValue}:DynamicFormType) => {
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
                    {form.type === "select" && form.name !== "reportType" &&
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                            <Select
                                placeholder={form.label} 
                                style={{ width: 380 }}
                                defaultValue={selectedValue}
                                onChange={(e)=>{setSelectedValue(e)}}
                                options={roles.map((role) => ({ label: role, value: role }))}
                            />
                        </Form.Item>
                    } 
                     {form.type === "select" && form.name== "reportType"  &&
                        <Form.Item  
                            label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
                            key={index} className='mb-6 font-bold text-lg' 
                            name={form.name} labelCol={{ span: 10 }}  
                            rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
                              <Select
                                    showSearch
                                // value={value}
                                disabled={disableElement}
                                style={{ width: 280 }}
                                placeholder={"Test Name"}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={handleImage}
                                onChange={handleSubmit}
                                notFoundContent={null}
                                options={(selectedValue || []).map((d:any) => ({
                                    value: d._id,
                                    label: d.testName,
                                }))}
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
                 {button && <Button className={`bg-blue-500`} type="primary" htmlType="submit">{buttonText}</Button>}
                </Form.Item>  
            </Form>
        </div>
    )
}


