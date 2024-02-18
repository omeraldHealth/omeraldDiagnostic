import { StepHeader } from "@components/atoms/fileUploder/stepHeader";
import React, {  useState } from "react";
import { onboardSteps } from "utils/static";
import {DynamicFormCreator} from "components/molecules/form/dynamicForm"
import { BasicDetailsForm, basicFormArray, BranchDetails, branchDetailsFormArray, brandDetailsFormArray } from "utils/types/molecules/forms.interface";
import { BrandDetailsForm, UserDetails } from "@utils";
import { setUserDetails, uploadImage } from "utils/hook/userDetail";
import { useRouter } from "next/router";
import { Spinner } from "@components/atoms/loader";
import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { useAuthContext } from "utils/context/auth.context";
import { BackwardIcon } from "@heroicons/react/20/solid";
import { ForwardIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/clerk-react";

const ProfileSummaryComponent = dynamic(() => import('../profile').then(res=>res.ProfileSummaryComponent),{loading: () => <Spinner/>})

const OnboardComponents = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole,setSelectedRole] = useState("Select Role")
  const [currentStep, setCurrentStep] = useState(onboardSteps[0]);
  const {user,signIn} = useAuthContext() 
  const [diagnosticProfile,setDiagnosticProfile] = useState<UserDetails>({});
  const [logo,setLogo] = useState([]);
  const router = useRouter()
  const {user:ClerkUser,isLoaded} = useUser();


  let initial = {
    "phoneNumber":ClerkUser?.phoneNumbers[0].phoneNumber,
    "diagnosticName":diagnosticProfile?.diagnosticName,
    "email":diagnosticProfile?.email,
    "facebookUrl": diagnosticProfile?.brandDetails?.facebookUrl,
    "instaUrl": diagnosticProfile?.brandDetails?.instaUrl,
    "branchName": diagnosticProfile?.branchDetails?.[0]?.branchName,
    "branchEmail": diagnosticProfile?.branchDetails?.[0]?.branchEmail,
    "branchContact": ClerkUser?.phoneNumbers[0].phoneNumber,
    "managerName":diagnosticProfile?.managerName,
    "branchAddress": diagnosticProfile?.branchDetails?.[0]?.branchAddress,
  }

  const handleContinueForm = (values:BasicDetailsForm | BrandDetailsForm | BranchDetails) => {
    let val:any = values;

    if(Object?.keys(values).includes("brandLogo")){
      Object.assign(values,{"brandLogo":"https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"})
      val = {"brandDetails":values}
    }else if(Object?.keys(values).includes("branchName")){
      values["branchContact"] = ClerkUser?.phoneNumbers[0].phoneNumber,
      val = {"branchDetails":[values]}
    }   
    setDiagnosticProfile(Object.assign(diagnosticProfile, val))
    setCurrentStep(onboardSteps[currentStep.id])

  }

  const handleImage = (value:any) => {
    setLogo(value.logo)
  }


  const handleSubmit = async () => {
    // let brandLogoUrl;
    // //@ts-ignore
    // if(logo?.length>0){
    //   setLoading(true)
    //   brandLogoUrl = await uploadImage(logo?.[0]?.originFileObj);
    //   //save brandDetails with location
    //   brandLogoUrl && setDiagnosticProfile(Object.assign(diagnosticProfile,{"brandDetails":Object.assign(diagnosticProfile.brandDetails,{"brandLogo":brandLogoUrl})}))
      
    //   //creating admin role
    //   setDiagnosticProfile(Object.assign(diagnosticProfile,{"managersDetail":Object.assign({"managerName":diagnosticProfile?.managerName,"managerContact":diagnosticProfile?.phoneNumber,"managerRole":"Owner"})}))
    //   let insertDiag = await setUserDetails(diagnosticProfile)

    //   if (insertDiag.status == 201 && user) {
    //     setLoading(false);
    //     successAlert("Profile Created Succesfully")
    //     signIn(ClerkUser?.phoneNumbers[0]?.phoneNumber, "/dashboard");
    //   }

    //   if (insertDiag.status === 409) {
    //     setLoading(false);
    //     errorAlert("Error creating profile")
    //     router.push("/404");
    //   }
    // }else{
      //creating admin role
      setDiagnosticProfile(Object.assign(diagnosticProfile,{"brandDetails":Object.assign(diagnosticProfile.brandDetails,{"brandLogo":"https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"})}))
      
      setDiagnosticProfile(Object.assign(diagnosticProfile,{"managersDetail":Object.assign({"managerName":diagnosticProfile?.managerName,"managerContact":diagnosticProfile?.phoneNumber,"managerRole":"Owner"})}))
      
      try{
        let insertDiag = await setUserDetails(diagnosticProfile)
        if (insertDiag.status == 201) {
          setLoading(false);
          successAlert("Profile Created Succesfully")
          router.push("/verifyUser")
        }else if(insertDiag?.status?.response?.status){
          setLoading(false);
          errorAlert("Error creating profile"+ insertDiag?.status?.response?.data?.error )
          router.push("/404");
        }
      }catch (err){
        setLoading(false);
        errorAlert("Error creating profile"+ err )
        router.push("/404");
      }
  }

  const handleFormBack = () => {
    if(currentStep.id===3){
      setCurrentStep(onboardSteps[1])
    }else if(currentStep.id===2){
      setCurrentStep(onboardSteps[0])
    }else{
      setCurrentStep(onboardSteps[0])
    }
  }

  const handleFormForward = () => {
    if(currentStep.id<3){
      setCurrentStep(onboardSteps[currentStep.id])
    }
  }

  return (
    <section className="lg:h-[70vh] mt-[7vh] mb-[12vh] min-h-[60vh]">
            <section className="w-[90vw] sm:h-auto sm:w-[90vw] lg:w-[48vw] md:h-[30vh] lg:h-auto max-h-[80vh] rounded-lg bg-white shadow-xl m-auto self-center pb-5 text-center relative"> 
              <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
                  <StepHeader stepList={onboardSteps} currentStep={currentStep}  />
              </div>
              <div className="h-auto">
                  <span className="flex justify-between px-4">
                    <a href="#" onClick={handleFormBack} className=""><BackwardIcon className="w-7  text-gray-400"/></a>
                    <a href="#" onClick={handleFormForward} className=""><ForwardIcon className="w-7  text-gray-400"/></a>
                  </span>
                 
                  {
                    currentStep?.id === 1 && <div className="my-4 w-[90%] sm:w-[70%] md:w-[70%] h-auto p-4">
                      <DynamicFormCreator disableElement={true} initial={initial} buttonText="Continue" formProps={basicFormArray} handleSubmit={handleContinueForm}/>
                    </div>
                  }
                  {
                    currentStep?.id === 2 && <div className=" w-[50%] h-auto p-4">
                      <DynamicFormCreator buttonText="Continue"  initial={initial} formProps={brandDetailsFormArray} handleImage={handleImage} handleSubmit={handleContinueForm}/>
                    </div>
                  }
                  {
                    currentStep?.id === 3 && <div className="w-[60%]  h-auto p-4">
                    <DynamicFormCreator disableElement={true}  buttonText="Continue" initial={initial} selectedValue={selectedRole} setSelectedValue={setSelectedRole} formStyle="" formProps={branchDetailsFormArray} handleSubmit={handleContinueForm}/>
                    </div>
                  }
                  {
                    currentStep?.id === 4 && <div className="w-[100%] h-auto p-4">
                      <ProfileSummaryComponent summary={true} props={diagnosticProfile} />
                      <section className="mx-10 mb-4 flex justify-end">
                        <button onClick={handleSubmit} className="bg-green-900 absolute text-white text-sm font-light px-4 py-2 rounded-md">Submit</button>
                      </section>
                    </div>
                  }
              </div>
            </section>
            {(!isLoaded || loading) && <Spinner/>}
    </section>
   
  );
};

export default OnboardComponents;