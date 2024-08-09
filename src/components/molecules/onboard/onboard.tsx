import { useUser } from "@clerk/clerk-react";
import { getDiagnosticUserApi } from "@utils/index";
import { Button,Steps } from "antd";
import { useCreateDiagnostic, useQueryGetData, useUpdateUser } from "@utils/reactQuery";
import { successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { OnboardingForm } from "./onboardForm";
import { OnboardingSummary } from "./summary";

const OnboardNewComponents: React.FC = () => {
    const [formData, setFormData] = useState({});
    const [current, setCurrent] = useState(0);
    const { user } = useUser();
    const router = useRouter()
    const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
    const { data: userData, refetch, isLoading } = useQueryGetData('userData', getDiagnosticUserApi + userPhoneNumber,{ enabled: !!userPhoneNumber });
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
                let newDiagnosticCenters= 
                    {
                        "diagnostic": data?.data?._id,
                        "branches": [
                            {
                                "branchId": data?.data?.branches[0]?._id,
                                "roleName": "owner"
                            }
                        ]
                    }
                let updatedDC = [...userData?.data?.diagnosticCenters, newDiagnosticCenters];
                updateUser.mutate({data: {diagnosticCenters: updatedDC}})
            }
        },
        onError:(err)=>{
          warningAlert("Error creating profile"+ err.message)
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
                {steps.map(item => (<Steps key={item.title} title={item.title} />))}
            </Steps>
            <div className="mt-5">{steps[current].content}</div>
            <div>
               {current === 1 && <Button type="primary" onClick={prev} className="ml-5" >Previous</Button>}
               {current === 1 && <Button type="dashed" onClick={handleSubmit} className="ml-5" >Submit</Button>}
            </div>
        </div>
    );
};

export default OnboardNewComponents;

