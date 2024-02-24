import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@components/atoms/loader";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { onboardSteps } from "utils/static";
import { StepHeader } from "@components/atoms/fileUploder/stepHeader";
import { UserDetails, BrandDetailsForm, OnboardStepsType, IManagerDetails, uploadDiagnosticLogoApi } from "@utils";
import { BasicDetailsForm, BranchDetails, basicFormArray, branchDetailsFormArray, brandDetailsFormArray } from "utils/types/molecules/forms.interface";
import { createDiagProfile } from "utils/hook/userDetail";
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import dynamic from "next/dynamic";
import DynamicFormGenerator from "../form/dynamicForm";
import { useRecoilState } from "recoil";
import { logoStateData } from "@components/common/recoil/logo";
import { useUploadBranding } from "utils/reactQuery";
import axios from "axios";
import { delay } from "lodash";

const ProfileSummaryComponent = dynamic(() => import('../profile').then(res=>res.ProfileSummaryComponent),{loading: () => <Spinner/>})

const OnboardComponents = () => {

  const { user } = useUser();
  const router = useRouter();
  const managerName = user && user?.fullName;
  const phoneNumber = user && user?.phoneNumbers?.[0]?.phoneNumber;
  const [currentStep, setCurrentStep] = useState<OnboardStepsType>(onboardSteps[0]);
  const [formData, setFormData] = useState<BasicDetailsForm | BranchDetails | BrandDetailsForm | UserDetails | IManagerDetails |  null>(null);
  const [logoState, setLogoState] = useRecoilState(logoStateData) 
  const [loading,setLoading] = useState(false)

  const addLogo = useUploadBranding({
    onSuccess: (data) => {
      setFormData({...formData,"brandLogo":data?.data})
      successAlert("Profile updated sucessfully")
    },
    onError: (error) => {
      errorAlert("Error updating profile")
    },
  })

  const onNext = async () => {
    // Add logic for handling next step
    if(currentStep.id <= 3) setCurrentStep(onboardSteps[currentStep.id])
  };

  const onBack = () => {
      // Add logic for handling previous step
      const stepId = currentStep.id;
      const targetStep = onboardSteps.find((step) => step.id === Math.max(0, stepId - 1)) || onboardSteps[0];
      setCurrentStep(targetStep);
  };

  const onFormSubmit = async () => {
    // Add logic for submitting form data 

    // addLogo?.mutate(formDataImage)
    const formDataImage = new FormData();
    formDataImage.append('file', logoState);
    setLoading(true)
    let logoResp = await  axios.post(uploadDiagnosticLogoApi, formDataImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if(logoResp?.status === 200){
      setLoading(false)
      const updatedFormData = {
        ...formData,
        brandDetails: { ...formData?.brandDetails,brandLogo: logoResp?.data?.url}
      };
      setFormData(updatedFormData)
      successAlert("Logo uploaded succesfully")
    }

    delay(async()=>{
        setFormData((prevData: any) => ({ ...prevData, "managersDetail": [{managerName: managerName, managerContact: phoneNumber, managerRole : "owner"}] }));
        console.log(formData)
        if(formData?.managersDetail?.[0]?.managerName){
          try {
            let insertDiag = await createDiagProfile(formData)
            if(insertDiag.status === 201){
              successAlert("Profile created sucessfully")
              router.push("verifyUser")
              setLoading(false)
            }
          } catch (error) {
              warningAlert("Error creating profile "+error)
              setLoading(false)
          }
        }
    },300)

  };

  const uploadImage = async (val: any) => {
    let imageObject = Object.preventExtensions(val?.logo[0]?.originFileObj);
    setLogoState(imageObject)
  }

  const getFormProps = () => {
    // return form props for each step
    switch (currentStep?.id) {
      case 1:
        return { formProps: formArrays?.basicForm, disableElement: true, buttonText: "Continue", disabledFields: ["phoneNumber","managerName"], defaultValues: {phoneNumber: phoneNumber, managerName: managerName, ...formData }  };
      case 2:
        return { formProps: formArrays?.branchForm, disableElement: false, buttonText: "Continue", handleImage: uploadImage, disabledFields: ["branchContact"], defaultValues: {branchContact: phoneNumber, ...formData?.branchDetails?.[0]  }  };
      case 3:
        return { formProps: formArrays?.brandForm, disableElement: true, buttonText: "Continue", defaultValues: {...formData?.brandDetails }};
      case 4:
        return { summary: true, props: formData, buttonText: "Submit" };
    }
  };

  const handleFormSubmit = (value: any) => {
    // Handle form submission based on the current step
    switch (currentStep?.id) {
      case 1:
        setFormData((prevData) => ({ ...prevData, ...value }));
        onNext();
        break;
      case 2:
        setFormData((prevData:any) => ({
          ...prevData,
          branchDetails: [
            ...(prevData?.branchDetails || []),
            { ...value },
         ],}));
        onNext();
        break;
      case 3:
        setFormData((prevData: any) => ({
          ...prevData,
          brandDetails: { ...(prevData?.brandDetails || {}), ...value },
        }));
        onNext();
        break;
      case 4:
        onFormSubmit()
        break;
      default:
        // console.log(formData);
    }
  };

  const formArrays = {
    basicForm: basicFormArray,
    branchForm: branchDetailsFormArray,
    brandForm: brandDetailsFormArray(uploadImage),
  };
  
  const formDetails = getFormProps();

  return (
    <section className="lg:h-[70vh] mt-[7vh] mb-[12vh] min-h-[60vh]">
      <section className="w-[90vw] sm:h-auto sm:w-[90vw] lg:w-[48vw] md:h-[30vh] lg:h-auto max-h-[80vh] rounded-lg bg-white shadow-xl m-auto self-center pb-5 text-center relative">
        <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
          <StepHeader stepList={onboardSteps} currentStep={currentStep} />
        </div>
        <div className="h-auto">
          <span className="flex justify-between px-4">
            <a href="#" onClick={onBack} className=""><BackwardIcon className="w-7  text-gray-400" /></a>
            <a href="#" onClick={onNext} className=""><ForwardIcon className="w-7  text-gray-400" /></a>
          </span>

          <div className={`w-[${currentStep?.id === 4 ? '100%' : currentStep?.id === 3 ? '60%' : currentStep?.id === 2 ? '50%' : '90%'}] h-auto p-4`}>
            {currentStep?.id !== 4 && <DynamicFormGenerator formProps={formDetails?.formProps || basicFormArray} buttonText={formDetails?.buttonText || ""} handleSubmit={handleFormSubmit} 
            disabledFields={formDetails?.disabledFields} defaultValues={formDetails?.defaultValues}  />}
            {currentStep?.id === 4 && (
              <div>
                <ProfileSummaryComponent summary profile={formDetails?.props} style="" />
                <section className="mx-10 mb-4 flex justify-end">
                  <button onClick={handleFormSubmit} className="bg-green-900 absolute text-white text-sm font-light px-4 py-2 rounded-md">
                    {formDetails?.buttonText}
                  </button>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
      {loading && <Spinner />}
    </section>
  )
};

export default OnboardComponents;