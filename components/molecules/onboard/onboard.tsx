import { useUser } from "@clerk/clerk-react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { getDiagnosticUserApi, uploadDiagnosticLogoApi, uploadDiagnosticReportApi } from "@utils";
import { Button, Form, Input, Select, Steps, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { toast } from "react-toastify";
import { Row, Col } from 'antd';
import { useCreateDiagnostic, useQueryGetData, useUpdateDiagnostic, useUpdateUser } from "utils/reactQuery";
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "@components/common/recoil/user";

const OnboardNewComponents: React.FC = () => {
    const [formData, setFormData] = useState({});
    const [current, setCurrent] = useState(0);
    const { user } = useUser();
    const router = useRouter()
    const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
    const setUserData = useSetRecoilState(userState);
    const { data: userData, status, refetch, isLoading } = useQueryGetData('userData', 
    getDiagnosticUserApi + userPhoneNumber,{ enabled: !!userPhoneNumber });

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const updateUser = useUpdateUser({
        onSuccess:(data) => {
          successAlert("User Updated Succesfully")
          refetch()
          if(!isLoading && userData?.data?._id ){
            router.push("/chooseDc")
          }
        },
        onError:(err)=>{
          warningAlert("Error updating user"+ err)
        }
    }, userData?.data?._id) 

    const createDiagProfile = useCreateDiagnostic({
        onSuccess:(data) => {
            successAlert("Profile Created Succesfully")
            if(data?.status === 201 && data?.data?._id){
                let diagnosticCenters= [
                    {
                        "diagnostic": data?.data?._id,
                        "branches": [
                            {
                                "branchId": data?.data?.branches[0]?._id,
                                "roleName": "owner"
                            }
                        ]
                    }
                ]

                updateUser.mutate({data: {diagnosticCenters: diagnosticCenters}})
            }else{
                errorAlert("Error fetching alert")
            }
        },
        onError:(err)=>{
          warningAlert("Error creating profile"+ err)
        }
    })  

    const handleSubmit = () => {
        let finalData = {
            centerName: formData?.centerName,
            email: formData?.email,
            phoneNumber: formData?.phoneNumber,
            ownerId: userData?.data?._id,
            brandingInfo: {
                logoUrl: formData?.brandLogo || null
            },
            branches: [{
                branchName: formData?.branchName,
                branchContact: formData?.branchContact,
                branchAddress: formData?.branchAddress,
                branchEmail: formData?.branchEmail,
            }]
        };
        
        if(finalData){
            createDiagProfile.mutate({data: finalData});
        }
    };
    
    const steps = [
        {
            title: 'Diagnostic Details',
            content: (
                <div  className="min-h-[40vh] w-full">
                    <OnboardingForm formData={formData} setFormData={setFormData} next={next} />
                </div>
            ),
        },
        {
            title: 'Summary',
            content: (
                <div className="min-h-[40vh]">
                    <OnboardingSummary formData={formData} />
                </div>
            ),
        }
    ];
    
    return (
        <div className="w-[100%]">
            <Steps current={current}>
                {steps.map(item => (
                    <Steps key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="mt-5">{steps[current].content}</div>
            <div>
               {current === 1 && <Button type="primary" onClick={prev} className="ml-5" >Previous</Button>}
               {current === 1 && <Button type="dashed" onClick={handleSubmit} className="ml-5" >Submit</Button>}
            </div>
        </div>
    );
};

const OnboardingForm = ({next,setFormData,formData}:any) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

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
          // Get the URL of the uploaded file
          const url = info.file.response.url;
          setImageUrl(url);
          setLoading(false);
          // Set the URL in the form field

          form.setFieldsValue({ url: imageUrl });
          toast.success(`${info.file.name} file upload successfully.`);
    
        } else if (info.file.status === 'error') {
          setLoading(false);
        }
    
    };

    const customRequest = async ({ action, file, headers }:any) => {
        try {

          const formData = new FormData();
          // Append the file with the desired name "file"
          formData.append('file', file);
      
          // Make the request with axios including the token in the headers and form data
          const response = await axios.post(action, formData);
          
          setImageUrl(response.data.url);
          return response;
        } catch (error) {
        //   toast.error("File upload failed.");
          setLoading(false);
          throw new Error('File upload failed.');
        }
    };

    return (
        <div className="w-full">
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
                                action={uploadDiagnosticLogoApi} // Specify your upload endpoint
                                customRequest={customRequest}
                                listType="picture-card"
                                showUploadList={false}
                                onChange={handleUpload}
                                accept="image/*"
                                >
                                {imageUrl ? (
                                <img src={imageUrl} alt="avatar" className="my-2" style={{ width: '100%'}} />
                                ) : (
                                    <div>
                                        {loading ? <LoaderIcon /> : <PlusCircleIcon />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
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

const OnboardingSummary = ({ formData }: any) => {
    return (
      <div className="container mx-auto px-8 py-4">
        <Row className="space-y-4">
          <Col span={6}>
            <div className="flex items-center mb-6 mt-2 ">
                <img
                  src={formData?.brandLogo || "https://omerald.s3.ap-northeast-1.amazonaws.com/logoIcon_hzhein.webp"}
                  alt="Brand Logo"
                  className="w-[7vw] h-[7vw] rounded-full border-4 border-gray-200"
                />
            </div>
          </Col>
          <Col span={10}>
            <div className="">
              <h2 className="text-xl mb-4 font-semibold text-gray-800">Diagnostic Details</h2>
              <p className="text-gray-700  my-6"><strong>Diagnostic Name:</strong> {formData?.centerName}</p>
              <p className="text-gray-700  my-6"><strong>Diagnostic Phone Number:</strong> {formData?.phoneNumber}</p>
              <p className="text-gray-700  my-6"><strong>Diagnostic Email:</strong> {formData?.email}</p>
              {/* <p className="text-gray-700  my-6"><strong>Diagnostic Manager:</strong> {formData?.fullName}</p> */}
            </div>
          </Col>
          <Col span={8}>
            <div className="">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Branch Details</h2>
              <p className="text-gray-700  my-6"><strong>Branch Name:</strong> {formData?.branchName}</p> 
              <p className="text-gray-700  my-6"><strong>Branch Email:</strong> {formData?.branchEmail}</p>
              <p className="text-gray-700  my-6"><strong>Branch Contact:</strong> {formData?.branchContact}</p>
              <p className="text-gray-700  my-6"><strong>Branch Location:</strong> {formData?.branchAddress}</p> 
            </div>
          </Col>
        </Row>  
      </div>
    );
};
  

export default OnboardNewComponents;

