import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Space, Spin, Upload } from 'antd';
import { FormType } from 'utils/types/molecules/forms.interface';
import { UploadOutlined } from '@ant-design/icons';


interface DynamicFormType {
  formProps: Array<FormType>;
  buttonText: string;
  handleSubmit: (values: any) => void;
  handleSearch?: (values: any) => void;
  selectedValue?: any;
  disabledFields?: string[]; // Array of field names to be disabled
  defaultValues?: { [key: string]: any };
  uploadUrl?: string;
}

const DynamicFormGenerator: React.FC<DynamicFormType> = ({ formProps, buttonText, handleSubmit, disabledFields = [], defaultValues = {}, handleSearch, selectedValue}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    handleSubmit(values);
  };

  const isFieldDisabled = (fieldName: string) => disabledFields.includes(fieldName);

  const renderFormItem = (formItem: FormType) => {
    const disableField = isFieldDisabled(formItem.name);
    const defaultValue = defaultValues[formItem.name];

    switch (formItem.type) {
      case 'text':
      case 'email':
      case 'contact':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ pattern: formItem.pattern, required: formItem.required }]}
            initialValue={defaultValue}
          >
            <Input placeholder={formItem.label} disabled={disableField} />
          </Form.Item>
        );
      case 'phoneNumber':
        // Implement your phone number input logic
        return null;
      case 'select':
          return (
            <Form.Item
              key={formItem.name}
              label={formItem.label}
              name={formItem.name}
              rules={[{ pattern: formItem.pattern, required: formItem.required }]}
              initialValue={defaultValue}
            >
              <Select
                placeholder={formItem.label}
                disabled={disableField}
                // onChange={handleSelect}
              >
                {formItem.options && formItem.options.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
      case 'date':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ required: formItem.required }]}
          >
            <DatePicker onChange={formItem.handleDate} disabled={disableField} />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ pattern: formItem.pattern, required: formItem.required }]}
            initialValue={defaultValue}
          >
            <Radio.Group disabled={disableField}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="others">Others</Radio>
            </Radio.Group>
          </Form.Item>
        );
      case 'tags':
        return (
          <Form.Item key={formItem.label+1} className='mb-6' name={formItem.name} labelCol={{ span: 0 }} >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Aliases"
            />
          </Form.Item>
        );
      case 'calender':
          return (
            <Form.Item key={formItem.label+1} className='mb-6' name={formItem.name} labelCol={{ span: 0 }} >
               <Space direction="vertical">
                  <DatePicker
                    onChange={formData?.handleDate}
                    format="YYYY-MM-DD"
                    placeholder={formItem.label}
                  />
                </Space>
              </Form.Item>
          );
      case 'upload':
          return (
            <Form.Item key={formItem.label+1} className='mb-6' name={formItem.name} labelCol={{ span: 0 }} >
                 <Upload action={formItem?.uploadUrl}  onChange={formItem?.handleUpload}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
            </Form.Item>
          );
      case 'search':
        return (
          <Form.Item key={formItem.label+1} className='mb-6' name={formItem.name} labelCol={{ span: 0 }} >
           <Select
              showSearch
              style={{ width: 380 }}
              placeholder={"Test Name"}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onChange={handleSubmit}
              onSearch={handleSearch}
              notFoundContent={null}
              options={(selectedValue || []).map((d:any) => ({
                key: d._id,
                value: d._id,
                label: d.name,
              }))}
          />
          </Form.Item>
        );
        default:
        return null;
    }
  };

  const renderFormItemsInColumns = () => {
    const itemsPerColumn = Math.ceil(formProps.length / 2);
  
    return (
      <section className={"w-[100%] grid grid-cols-2 gap-10"}>
        <section >
          {formProps.slice(0, itemsPerColumn).map((formItem) => renderFormItem(formItem))}
        </section>
        <section >
          {formProps.slice(itemsPerColumn).map((formItem) => renderFormItem(formItem))}
        </section>
      </section>
    );
  };

  return (
    <Form form={form} onFinish={handleFormSubmit} layout="vertical">
      {formProps.length > 5 ? (
        renderFormItemsInColumns()
      ) : (
        formProps.map((formItem) => renderFormItem(formItem))
      )}

      <Form.Item className={`flex justify-start col-span-2`}>
        <Button className={`bg-blue-500`} type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicFormGenerator;




// import React, { Fragment, useEffect, useState } from 'react';
// import { Button, DatePicker, Form, Input, Radio, Select, SelectProps } from 'antd';
// import { DynamicFormType } from 'utils/types/molecules/forms.interface';
// import LogoUploader from '@components/atoms/fileUploder/logoUploaders';
// import { roles } from 'utils/static';
// import { FileUploader } from '@components/atoms/fileUploder/fileUpload';
// import BannerUploader from '@components/atoms/fileUploder/bannerUpload';
// import { useSelector } from 'react-redux';
// import { debounce, isElement } from 'lodash';
// import moment from 'moment';
// import { useQueryGetData } from 'utils/reactQuery';
// import { useAuthContext } from 'utils/context/auth.context';
// import { Option } from 'antd/es/mentions';
// import { PhoneInputCountry } from '@components/atoms/phoneInput/phoneInput';

// import { getDiagProfileByPhoneApi } from '../../../utils';


// export const DynamicFormCreator = ({formProps,button=true,showLabel,disableElement,initial,formStyle,reportsValidation,handleSubmit,handleImage,buttonText,selectedValue,setSelectedValue}:DynamicFormType) => {

//     const {diagnosticDetails} = useAuthContext();
//     const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagProfileByPhoneApi+diagnosticDetails?.phoneNumber)

//     const [isDisabled,setDisabled] = useState(false);
//     const disabledDate = (current:any) => {
//       return current && current > moment().endOf('day');
//     };
  
//     useEffect(()=>{
//       if(reportsValidation){
//           setDisabled(true)
//       }
//     },[])
  
//     const employees = diagnostic?.data?.managersDetail?.map((person:any) => {return {"value":person.managerName,"key":person.managerContact}});

//     const [datas, setData] = useState<SelectProps['options']>(diagnostic?.data?.pathologistDetail);
//     const handleSearch = (newValue: string) => {
//       let temp = diagnostic?.data?.pathologistDetail?.filter((report:any)=> {return report.name.includes(newValue) || report.designation.includes(newValue)})
//       setData(temp)
//   };
  
//   const debouncedSearch = debounce(handleSearch, 500);
  
//   const roles = ['Admin', 'Manager','Operator','Spoc'];
//   const plainOptions = ['Male', 'Female', 'Others'];
    
//     return (
//         <div>
//             <Form className={formStyle} onFinish={handleSubmit} layout="vertical" name="dynamic" initialValues={initial}>
//                 {/* Text Fields */}
//                {formProps.map((form,index) => <Fragment key={index}>
//                     {form.type === "text"  && 
//                         <Form.Item  
//                             key={index}
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={index} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                            <Input   key={index}  disabled={isDisabled || ( disableElement && (form.name =="phoneNumber" || form.name =="branchContact"))} placeholder={form.label} className="border-gray-300 rounded-lg text-black font-light text-sm py-2" />
                           
//                         </Form.Item>
//                     }
//                      {form.type === "phoneNumber" && 
//                         <Form.Item    key={form.label+2} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                             <Input onChange={(event)=>{
//                                 if(event.target.value.length>9 && event.target.value.length<13){
//                                 setDisabled(false)
//                                 }else{  setDisabled(true)}
//                             }} placeholder={form.label} className="border-gray-400 rounded-lg  text-black font-light text-sm" />
//                         </Form.Item>
//                         }
//                          {form.type === "patientContact" && 
//                         <Form.Item    key={form.label+2} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  rules={[{ pattern: form?.pattern,message: `Please input ${form.label}`}]}>
//                             <PhoneInputCountry phoneNumber={selectedValue} handleDisable={setDisabled} setPhoneNumber={setSelectedValue}/>
//                         </Form.Item>
//                         }
//                           {form.type === "settingContact" && 
//                         <Form.Item    key={form.label+3} className='mb-6 font-bold text-lg' name={form.name} labelCol={{ span: 10 }}  >
//                             <PhoneInputCountry phoneNumber={selectedValue} setPhoneNumber={handleImage}/>
//                         </Form.Item>
//                         }
                        
//                      {form.type === "contact"  && 
//                         <Form.Item  
//                         key={form.label+3}
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={index} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                             <Input placeholder={form.label} className="border-gray-300 rounded-lg text-black font-light text-sm py-2" />
//                         </Form.Item>
//                     }  
//                     {form.type === "email" && 
//                         <Form.Item  
//                         key={form.label+4}
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={index} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                             <Input   disabled={isDisabled} placeholder={form.label} className="border-gray-300 lowercase rounded-lg text-black font-light text-sm py-2" />
//                         </Form.Item>
//                     } 
//                     {form.type === "image" &&  form.name != "signature" &&
//                         <Form.Item
//                         key={form.label+5}  
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={index} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: false,message: `Please input ${form.label}`}]}>
//                             <LogoUploader  handleImage={handleImage} />
//                         </Form.Item>
//                     }
//                     {form.type === "image" && form.name ==="signature" && 
//                         <Form.Item     key={form.label+6}  
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={index} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: false,message: `Please input ${form.label}`}]}>
//                             <BannerUploader text="Signature" handleImage={handleImage} />
//                         </Form.Item>
//                     }

//                     {form.type === "select" && form.name !== "reportType" &&
//                         <Form.Item  
//                         key={form.label+7}
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={index} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                             <Select
//                                 placeholder={form.label} 
//                                 defaultValue={selectedValue}
//                                 onChange={(e)=>{setSelectedValue(e)}}
//                                 options={roles.map((role) => ({key:role, label: role, value: role }))}
//                             />
//                         </Form.Item>
//                     } 
//                      {form.type === "select" && form.name== "reportType"  &&
//                         <Form.Item  
                        
//                             label={showLabel && <span style={{ color: 'red' }}>{form.name}</span>} 
//                             key={form.label+8} className='mb-6 font-bold text-lg' 
//                             name={form.name} labelCol={{ span: 10 }}  
//                             rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                               <Select
//                                 showSearch
//                                 // value={value}
//                                 disabled={disableElement}
//                                 style={{ width: 280 }}
//                                 placeholder={"Test Name"}
//                                 defaultActiveFirstOption={false}
//                                 showArrow={false}
//                                 filterOption={false}
//                                 onSearch={handleImage}
//                                 onChange={handleSubmit}
//                                 notFoundContent={null}
//                                 options={(selectedValue || []).map((d:any) => ({
//                                     key: d._id,
//                                     value: d._id,
//                                     label: d.testName,
//                                 }))}
//                             />
//                         </Form.Item>
//                         } 
//                         {form.type === "tags" &&
//                             <Form.Item      key={form.label+9} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
//                             <Select
//                                     mode="tags"
//                                     style={{ width: '100%' }}
//                                     placeholder="Aliases"
//                                 />
//                             </Form.Item>
//                         }
//                       {form.type === "pathologist" &&
//                         <Form.Item initialValue={{["value"]: "Select Pathologist"}} className='mb-6  col-span-1' name={form.name} labelCol={{ span: 0 }} >
//                          <Select
//                             key={form.name} 
//                                 showSearch
//                             // value={value}
//                             disabled={isDisabled}
//                             style={{ width:340}}
//                             className="w-[16vw]"
//                             placeholder={"Select Pathologist"}
//                             defaultActiveFirstOption={false}
//                             showArrow={false}
//                             filterOption={false}
//                             onSearch={debouncedSearch}
//                             // onChange={handleDate}
//                             notFoundContent={null}
//                             options={datas?.map((path:any) => ({key:path.name, label: path.name+" ("+path.designation+")", value: path.name }))}
//                         />
//                             </Form.Item>
//                             }
//                             {form.type === "date" &&
//                             <Form.Item      key={form.label+11} className='mb-6' name={form.name} labelCol={{ span: 0 }} >
//                                 <DatePicker disabled={isDisabled} disabledDate={disabledDate} format='YYYY-MM-DD' className='w-auto sm:w-[20vw] py-2 border-gray-400 rounded-lg' placeholder={form.label} onChange={handleImage} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}/>
//                             </Form.Item>
//                             }
//                             {form.type === "gender" &&
//                             <Form.Item      key={form.label+12} className='mb-6' name={form.name} labelCol={{ span: 0 }} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                                 <Radio.Group   disabled={isDisabled} options={plainOptions} onChange={handleImage} value={"male"} />
//                             </Form.Item>
//                             }
//                             {form.type === "textArea" &&
//                             <Form.Item      key={form.label+13} className='mb-6' name={form.name} labelCol={{ span: 0 }} rules={[{ pattern: form?.pattern, required: form.required,message: `Please input ${form.label}`}]}>
//                                 <textarea   disabled={isDisabled} className='border-gray-300 border-2 p-2 rounded-lg' rows={4} cols="36" placeholder={form.label} maxLength={6000} />
//                             </Form.Item>
//                             } 
//                             {form.type === "multiSelect" &&
//                             <Form.Item key={form.label+13} className='mb-6' name={form.name} labelCol={{ span: 0 }}>
//                                 <Select
//                                     mode="multiple"
//                                     labelInValue
//                                     placeholder="Select Operators"
//                                     style={{ width: '100%' }}
//                                     options={employees}
//                                 />
//                             </Form.Item>
//                             } 
//                     </Fragment>
//                 )}

//                  {/* Form Submit Button */}
//                 <Form.Item className={`flex justify-start col-span-2`}>
//                  {button && <Button className={`bg-blue-500`} type="primary" htmlType="submit">{buttonText}</Button>}
//                 </Form.Item>  
//             </Form>
//         </div>
//     )
// }

