import { useUser } from "@clerk/clerk-react";
import { errorAlert2, successAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { uploadDiagnosticLogoApi } from "@utils/index";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";

export const OnboardingForm = ({next,setFormData,formData}:any) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, isLoaded } = useUser();
    const userContact = user?.phoneNumbers?.[0]?.phoneNumber;

    const onFinish = (values:any) => {
        if(imageUrl){
            values = {...values, "brandLogo": imageUrl}
        }
        setFormData(values)
        next()
    }

    const handleUpload = (info:any) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          const url = info.file.response.url;
          setImageUrl(url);
          setLoading(false);
          form.setFieldsValue({ url: imageUrl });
          successAlert(`${info.file.name} file upload successfully.`);
        } else if (info.file.status === 'error') {
          setLoading(false);
        }
    };

    const customRequest = async ({ action, file, headers }:any) => {
        try {
          setLoading(true)
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post(action, formData);
          if(response?.status == 201){
            setImageUrl(response.data.url);
            setLoading(false)
            return response;
          }else{
            setLoading(false)
            errorAlert2("Error uploading file")
          }
        } catch (error) {
          setLoading(false)
          throw new Error('File upload failed.');
        }
    };

    return (
        <div className="w-full">
          {(loading || !isLoaded) && <Spinner/>}
          <Form
                form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        phoneNumber: formData?.phoneNumber,
                        email: formData?.email,
                        centerName: formData?.centerName,
                        branchContact: formData?.branchContact,
                        branchEmail: formData?.branchEmail,
                        branchName: formData?.branchName,
                        branchAddress: formData?.branchAddress,
                        branchLogo: formData?.brandLogo, 
                      }}
                    validateTrigger="onSubmit"// Trigger validation only on form submission
                >
                <div className=" grid-cols-12 gap-2 border-b-2 border-slate-200 pb-4 my-8">
                    <p className="col-span-2 text-xl my-4">Brand Details</p>
                    <section className="col-span-10 grid grid-cols-2 gap-4">
                        <Form.Item
                            name="brandLogo"
                            label="Brand Logo"    
                            key={"branchLogo"}
                            rules={[{ required: false, message: 'Please upload brand logo!' }]}
                            >
                            <span >
                            <Upload
                                name="file"
                                action={uploadDiagnosticLogoApi}
                                customRequest={customRequest}
                                listType="picture-card"
                                showUploadList={false}
                                onChange={handleUpload}
                                accept="image/*"
                                >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" className="my-2 w-full" />
                                ) : (
                                    <div>
                                    {loading ? <LoaderIcon /> : <PlusCircleIcon />}
                                    <div className="mt-2">Upload</div>
                                    </div>
                                )}
                            </Upload>
                          
                            </span>
                        </Form.Item>
                    </section>
                </div>
                <div className=" grid-cols-12 gap-2 border-b-2 border-slate-200 pb-4">
                    <p className="col-span-2 text-xl my-4">Basic Details</p>
                    <section className="col-span-10 grid grid-cols-2 gap-4">
                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"    
                            key={"phoneNumber"}
                            initialValue={userContact && userContact}
                            rules={[{ required: true, message: 'Please enter diagnostic contact!' }]}
                        >
                            <Input disabled={!!userContact}  className="w-[100%] py-2 bg-gray-100" placeholder="Enter your diagnostic contact" />
                        </Form.Item>
                        <Form.Item
                            name="centerName"
                            label="Diagnostic Name"
                            key={"centerName"}
                            rules={[{ required: true, message: 'Please enter diagnostic name!' }]}
                        >
                            <Input className="w-[100%] py-2 bg-gray-100" placeholder="Enter your diagnostic name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Diagnostic Email"
                            key={"email"}
                            rules={[{ required: true, message: 'Please enter diagnostic email!' }]}
                        >
                            <Input className="w-[100%] py-2 bg-gray-100" placeholder="Enter your diagnostic email" />
                        </Form.Item>
                    </section>
                </div>
                <div className=" grid-cols-12 gap-2 border-b-2 border-slate-200 pb-4 my-8">
                    <p className="col-span-2 text-xl my-4">Branch Details</p>
                    <section className="col-span-10 grid grid-cols-2 gap-4">
                        <Form.Item
                            name="branchContact"
                            label="Branch Phone Number"    
                            key={"branchContact"}
                            initialValue={userContact && userContact}
                            rules={[{ required: true, message: 'Please enter branch contact!' }]}
                        >
                            <Input className="w-[100%] py-2 bg-gray-100" placeholder="Enter your branch contact" />
                        </Form.Item>
                        <Form.Item
                            name="branchEmail"
                            label="Branch Email"
                            key={"branchEmail"}
                            rules={[{ required: true, message: 'Please enter branch email!' }]}
                        >
                            <Input className="w-[100%] py-2 bg-gray-100" placeholder="Enter your branch email" />
                        </Form.Item>
                        <Form.Item
                            name="branchName"
                            label="Branch Name"
                            key={"branchName"}
                            rules={[{ required: true, message: 'Please enter branch name!' }]}
                        >
                            <Input className="w-[100%] py-2 bg-gray-100" placeholder="Enter your branch name" />
                        </Form.Item>
                        <Form.Item
                            name="branchAddress"
                            label="Branch Address"
                            key={"branchAddress"}
                            rules={[{ required: true, message: 'Please enter branch address!' }]}
                        >
                            <Input className="w-[100%] py-2 bg-gray-100" placeholder="Enter your branch address" />
                        </Form.Item>
                    </section>
                </div>
                <Button type="primary" htmlType="submit">Next</Button>
          </Form>
        </div>
    );
};



