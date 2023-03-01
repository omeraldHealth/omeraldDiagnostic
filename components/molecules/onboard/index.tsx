import { StepHeader } from "@components/atoms/form";
import React, { useEffect, useState } from "react";
import { onboardSteps } from "utils/static";
import {DynamicFormCreator} from "components/molecules/form/dynamicForm"
import { BasicDetailsForm, BranchDetails } from "utils/types/molecules/forms.interface";
import { useDispatch, useSelector } from "react-redux";
import { BrandDetailsForm, UserDetails } from "@utils";
import { ProfileSummaryComponent } from "../profile";
import { setUserDetails, uploadImage } from "utils/hook/userDetail";
import { basicFormArray, branchDetailsFormArray, brandDetailsFormArray, SET_DIAGNOSTIC_DETAILS } from "utils/store/types";
import { useRouter } from "next/router";
import { Spinner } from "@components/atoms/loader";

const OnboardComponent = () => {
  const [currentStep, setCurrentStep] = useState(onboardSteps[0]);
  const diagnostic = useSelector((state:any) => state.diagnosticReducer);
  const [diagnosticProfile,setDiagnosticProfile] = useState<UserDetails>(diagnostic);
  const [logo,setLogo] = useState({});
  const [banner,setBanner] = useState({});
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleForm = (values:BasicDetailsForm | BrandDetailsForm | BranchDetails) => {
    
    let val:any = values;

    if(Object?.keys(values).includes("brandLogo")){
      Object.assign(values,{"brandLogo":logo,"brandBanner":banner})
      val = {"brandDetails":values}
    }else if(Object?.keys(values).includes("branchName")){
      val = {"branchDetails":[values]}
    }
  
    setDiagnosticProfile(Object.assign(diagnosticProfile, val))
    setCurrentStep(onboardSteps[currentStep.id])
  }

  const handleImage = (value:any) => {
    if(Object?.keys(value).includes("logo")){
      setLogo(value.logo)
    }else if(Object?.keys(value).includes("banner")){
      setBanner(value.banner)
      console.log(value.banner)
    }
   
  }

  const handleSubmit = async () => {
    setLoading(true)
    //@ts-ignore
    let brandLogoUrl = await uploadImage(diagnosticProfile?.brandDetails.brandLogo);
    //@ts-ignore
    let brandBannerUrl = await uploadImage(diagnosticProfile?.brandDetails.brandBanner);

    setDiagnosticProfile(Object.assign(diagnosticProfile,{"brandDetails":
      Object.assign(diagnosticProfile.brandDetails,{"brandLogo":brandLogoUrl,"brandBanner":brandBannerUrl})
    }))

    let insertDiag = await setUserDetails(diagnosticProfile)
    if(insertDiag.status==200){
      dispatch({ type: SET_DIAGNOSTIC_DETAILS,payload: diagnosticProfile });
      setLoading(false)
      router.push("/dashboard")
    }
  }

  return (<section className="lg:h-[70vh] my-[10vh]">
          <section className="w-[90vw] sm:h-auto sm:w-[90vw] lg:w-[70vw] md:h-[30vh] lg:h-auto max-h-[80vh] rounded-lg bg-white shadow-xl m-auto self-center  sm:p-6 text-center relative"> 
            <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
                <StepHeader stepList={onboardSteps} currentStep={currentStep}  />
            </div>
            <div className="h-auto">
                {
                  currentStep?.id === 1 && <div className="my-10 w-[90%] sm:w-[70%] md:w-[50%] h-auto p-4">
                  <DynamicFormCreator buttonText="Continue" formProps={basicFormArray} handleSubmit={handleForm}/>
                  </div>
                }
                {
                  currentStep?.id === 2 && <div className="my-10 w-[50%] h-auto p-4">
                  <DynamicFormCreator buttonText="Continue" formProps={brandDetailsFormArray} handleImage={handleImage} handleSubmit={handleForm}/>
                  </div>
                }
                {
                  currentStep?.id === 3 && <div className="w-[50%] h-auto p-4">
                  <DynamicFormCreator buttonText="Continue" formProps={branchDetailsFormArray} handleSubmit={handleForm}/>
                  </div>
                }
                {
                  currentStep?.id === 4 && <div className="w-[100%] h-auto p-4">
                    <ProfileSummaryComponent {...diagnosticProfile} />
                    <section className="mx-10 mb-4 flex justify-end">
                    <button onClick={handleSubmit} className="bg-green-900 absolute text-white text-sm font-light px-4 py-2 rounded-md">Submit</button>
                    </section>
                  </div>
                }
            </div>
          </section>
          {loading && <Spinner/>}
    </section>
  );
};

export default OnboardComponent;