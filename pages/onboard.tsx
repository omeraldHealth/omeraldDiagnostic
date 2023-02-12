import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/lib/auth";
import { setUserDetails, uploadImage } from "@/lib/db";
import * as yup from "yup";
import { useRouter } from "next/router";
import InputGroup from "@/components/core/InputGroup/InputGroup.component";
import TextArea from "@/components/core/TextArea/TextArea.component";
import Button from "@/components/core/Button/Button.component";
import { imageWidthAndHeight } from "@/utils/helper";
import { IManagerDetails, UserDetails } from "middleware/models.interface";
import Loading from "@/components/core/LoadingIcon/Loading.component";
import { LoaderComp } from "@/components/alerts/loader";

type BasicDetailsForm = {
  fullName: string;
  diagnosticName: string;
  email: string;
  address: string;
  phoneNumber: string;
  branch: string;
};
type BrandDetailsForm = {
  brandLogo: FileList;
  facebookUrl?: string;
  instaUrl?: string;
};

const styles = {
  errorStyle: "text-red-500",
  inputStyles: "border-2 border-black block",
  button: "border-2 border-black mt-10 bg-blue-400 active:bg-blue-700",
};
const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

const checkDimensions = async (imageFile: FileList) => {
  let dimensions = await imageWidthAndHeight(imageFile[0]);
  return false;
};

const steps = [
  { id: 1, name: "Basic Details" },
  { id: 2, name: "Brand Details" },
  { id: 3, name: "Report Details" },
  { id: 4, name: "Summary" },
];

const schema = yup.object().shape({
  diagnosticName: yup.string().strict().required(),
  fullName: yup.string().strict().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  branch: yup.string().required(),
});
const schemaStep2 = yup.object().shape({
  brandLogo: yup
    .mixed()
    .test("length", "Logo is Required", (value) => value?.length == 1)
    .test(
      "type",
      "Unsupported File Format (Only jpg, jpeg, png format are allowed)",
      (value) =>
        ["image/jpg", "image/jpeg", "image/png"].includes(
          value && value[0]?.type
        )
    )
  ,facebookUrl: yup.string().url("Please Enter a valid Url"),
  instaUrl: yup.string().url("Please Enter a valid Url"),
});

const schemaStep3 = yup.object().shape({
  managerName: yup.string().required().strict(true),
  managerRole: yup.string().required().strict(true),
  managerSignature: yup
    .mixed()
    .test("length", "Logo is Required", (value) => value?.length == 1)
    .test(
      "type",
      "Unsupported File Format (Only jpg, jpeg, png format are allowed)",
      (value) => validImageTypes.includes(value && value[0]?.type)
    )
    .test(
      "size",
      "File Size is too large",
      (value) => value && value[0]?.size <= 1000000
    )
});


const Onboard = () => {
  const { user, diagnosticDetails, signIn } = useAuth();
  const router = useRouter();
  const auth = useAuth()
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [managerDetails, setManagerDetails] = useState<FormData[]>([]);
  const [showStep3ContinueError, setShowStep3ContinueError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    getValues: getValuesStep1,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicDetailsForm>({
    resolver: yupResolver(schema),
  });
  setValue("phoneNumber", user && user.phoneNumber ? user.phoneNumber : "");

  const {
    register: registerStep2,
    getValues: getValuesStep2,
    setError: setErrorStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2, isValid: isValidStep2 },
  } = useForm<BrandDetailsForm>({
    mode: "onChange",
    resolver: yupResolver(schemaStep2),
  });
  const {
    setError: setErrorStep3,
    register: registerStep3,
    reset: resetStep3,
    handleSubmit: handleStep3AddManager,
    formState: { errors: errorsStep3 },
  } = useForm<IManagerDetails>({
    mode: "onChange",
    resolver: yupResolver(schemaStep3),
  });

  useEffect(()=>{
    if(auth.diagnosticDetails){
      router.push("/dashboard")
    }
  })

  const handleAddManager = async (data: IManagerDetails) => {
    // console.log(getValuesStep1());
    const newData = new FormData();
    newData.append("managerName", data.managerName);
    newData.append("managerRole", data.managerRole);
    newData.append("managerSignature", data.managerSignature[0]);
    // console.log(newData.values());
    setShowStep3ContinueError(false);
    setManagerDetails((val) => val.concat(newData));
    // resetStep3();
  };

  const handleSubmitStep3 = (handler: () => void) => {
    if (managerDetails.length > 0) {
      setShowStep3ContinueError(false);
      return handler();
    } else {
      setShowStep3ContinueError(true);
    }
  };

  const handleOnSubmitForm = async () => {
    setIsLoading(true);

    let data: UserDetails = {
      ...getValuesStep1(),
      brandDetails: {
        // ...getValuesStep2(),
        facebookUrl: getValuesStep2("facebookUrl") as string,
        instaUrl: getValuesStep2("instaUrl") as string,
        brandLogo: await uploadImage(getValuesStep2("brandLogo")[0]),
      },
      managersDetail: await Promise.all(
        managerDetails.map(async (manager) => {
          return {
            managerName: manager.get("managerName") as string,
            managerRole: manager.get("managerRole") as string,
            managerSignature: await uploadImage(
              manager.get("managerSignature") as File
            ),
          };
        })
      ),
    };

    const token = (await user?.getIdToken()) as string;
    const res = await setUserDetails(token, data);
    console.log(res);
    if (res.status == 200 && user) {
      setIsLoading(false);
      signIn(user, "/dashboard");
    }

    if (res.status === 409) {
      // console.log("changing route");
      router.push("/");
    }
  };

  const handleGoBack = () => {
    setCurrentStep((current) =>
      current.id == 1 ? current : steps[current.id - 2]
    );
  };
  const handleOnContinue = () => {
    setCurrentStep((current) =>
      current.id == 4 ? current : steps[current.id]
    );
  };

  if (isLoading) {
    return <LoaderComp />;
  }

  return (
    <div className="grid md:place-content-center w-[100vw] h-[100vh] bg-signBanner" >
      <div className="h-[80vh] w-[94%] m-auto lg:w-[75vw] relative flex flex-col xl:w-[65vw] shadow-lg bg-white rounded-md border-2 p-4 sm:p-10">
        <div id="steps" className="rounded-md bg-slate-50 w-full p-4 mb-4">
          {steps.map((step, index) => (
            <Fragment key={index}>
              <span
                id="stepId"
                className={`rounded-full font-bold text-lg shadow-sm sm:text-xs px-2 p-1 mx-1 sm:pl-1 lg:p-2 lg:px-3  ${
                  currentStep.id === step.id && "bg-blue-700 text-white"
                }
                ${currentStep.id < step.id && "bg-white text-blue-700"}
                ${currentStep.id > step.id && "bg-primary text-white"}`}
              >
                {step.id}
              </span>
              <span
                id="stepName"
                className={`mx-4 hidden sm:inline-block text-xs ${
                  currentStep.id === step.id && "text-blue-700"
                }
                ${currentStep.id < step.id && "text-black"}
                ${currentStep.id > step.id && "text-primary"}`}
              >
                {step.name}
              </span>
              {steps.length !== index + 1 && (
                <div
                  id="line"
                  className={`border  mx-1 sm:m-0 lg:mx-2 h-0 w-6  lg:w-10 mb-1 inline-block ${
                    currentStep.id === step.id &&
                    "border-blue-700 border-dashed"
                  }
                  ${currentStep.id < step.id && "border-dashed"}
                  ${currentStep.id > step.id && "border-primary border-solid"}`}
                ></div>
              )}
            </Fragment>
          ))}
        </div>
        <div>
          <h1 className="text-lg mb-5">{currentStep.name}</h1>
          {currentStep.id === 1 && (
            <form id="basicDetails" onSubmit={handleSubmit(handleOnContinue)}>
              <section className="h-[44vh] xl:h-[46vh] overflow-y-auto">
              <InputGroup
                labelName="Diagnostic Centre Name *"
                inputName="diagnosticName"
                placeholder="Add diagnostic name"
                error={errors.diagnosticName?.message}
                register={register}
              />
              <InputGroup
                labelName="Account manager Name *"
                inputName="fullName"
                placeholder="Add your name"
                error={errors.fullName?.message}
                register={register}
              />
              <InputGroup
                labelName="Email *"
                inputName="email"
                placeholder="example@example.com"
                error={errors.email?.message}
                register={register}
              />
              <InputGroup
                value={user && user.phoneNumber ? user.phoneNumber : ""}
                labelName="Phone Number *"
                inputName="phoneNumber"
                placeholder="Add your phone"
                disabled
                error={errors.phoneNumber?.message}
                register={register}
              />
              <InputGroup
                labelName="Branch *"
                inputName="branch"
                placeholder="Add Branch Name"
                error={errors.branch?.message}
                register={register}
              />
              <TextArea
                labelName="Address *"
                inputName="address"
                error={errors.address?.message}
                placeholder="Add branch address"
                register={register}
              />
              </section>
              <div className="flex justify-between w-[90%] pt-2 absolute bottom-4">
                <Button styles="basic" name="Back" classNames="bg-white" />
                <Button styles="basic" type="submit" name="Continue" />
              </div>
            </form>
          )}
          {currentStep.id === 2 && (
            <form
              id="brandDetails"
              onSubmit={handleSubmitStep2(handleOnContinue)}
            >
               <section className="h-[44vh] overflow-y-auto">
               {!Boolean(errorsStep2.brandLogo) &&
                getValuesStep2("brandLogo")?.length == 1 && (
                  <img
                    alt="logo"
                    className="w-10 h-10 rounded-full"
                    src={URL.createObjectURL(getValuesStep2("brandLogo")[0])}
                  />
              )}
              <InputGroup
                labelName="Upload Brand Logo *"
                inputName="brandLogo"
                placeholder="Upload Brand Logo"
                error={errorsStep2.brandLogo?.message}
                register={registerStep2}
                inputType="file"
              />
              <InputGroup
                labelName="Facebook Url *"
                inputName="facebookUrl"
                placeholder="Add Facebook Url"
                error={errorsStep2.facebookUrl?.message}
                register={registerStep2}
              />
              <InputGroup
                labelName="Instagram Url *"
                inputName="instaUrl"
                placeholder="Add Instagram Url"
                error={errorsStep2.instaUrl?.message}
                register={registerStep2}
              />
              </section>
              <div className="flex justify-between w-[90%] pt-2 absolute bottom-4">
                <Button
                  styles="basic"
                  name="Back"
                  onClick={handleGoBack}
                  classNames="bg-white"
                />
                <Button styles="basic" type="submit" name="Continue" />
              </div>
            </form>
          )}
          {currentStep.id === 3 && (
            <div id="reportDetails">
              <div className="md:flex justify-between max-h-[44vh] overflow-y-auto  mb-10">          
                <div className="flex-1">
                  <form
                    id="reportDetails"
                    onSubmit={handleStep3AddManager(handleAddManager)}
                  >
                    <InputGroup
                      labelName="Manager Name *"
                      inputName="managerName"
                      placeholder="Add operations manager name"
                      error={errorsStep3.managerName?.message}
                      register={registerStep3}
                    />
                    <InputGroup
                      labelName="Manager Role *"
                      inputName="managerRole"
                      placeholder="Add operations manager role"
                      error={errorsStep3.managerRole?.message}
                      register={registerStep3}
                    />

                    <InputGroup
                      labelName="Manager Signature *"
                      inputName="managerSignature"
                      placeholder="Add operations manager signature"
                      error={errorsStep3.managerSignature?.message}
                      register={registerStep3}
                      inputType="file"
                    />
                    <div className="flex justify-end pt-2">
                      {managerDetails.length<1 && <Button styles="basic" type="submit" name="Add" />}
                    </div>
                  </form>
                </div>
                <div className="flex flex-col my-2 sm:m-0 sm:items-center justify-between flex-1">
                  {managerDetails.map((manager, index) => (
                    <SignatureBlock
                      key={String(index)}
                      name={manager.get("managerName") as string}
                      role={manager.get("managerRole") as string}
                      signature={manager.get("managerSignature") as File}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between w-[90%] pt-2 absolute bottom-4">
                <Button
                  styles="basic"
                  name="Back"
                  classNames="bg-white"
                  onClick={handleGoBack}
                />
                {showStep3ContinueError && (
                  <span className="text-sm text-red-600">
                    Please add atleast one manager details!
                  </span>
                )}

                <Button
                  styles="basic"
                  type="submit"
                  name="Continue"
                  onClick={() => handleSubmitStep3(handleOnContinue)}
                />
              </div>
            </div>
          )}
          {currentStep.id == 4 && (
            <form id="summary" onSubmit={handleSubmit(handleOnContinue)}>
              <div className="flex justify-between max-h-[44vh] overflow-y-auto mb-10">
                <div className="flex-1 sm:mr-10 h-[44vh]">
                  <h1>Basic Details</h1>
                  <LabelNameandValue
                    labelName="Diagnostic Centre Name"
                    value={getValuesStep1("diagnosticName")}
                  />
                  <LabelNameandValue
                    labelName="Full Name"
                    value={getValuesStep1("fullName")}
                  />
                  <LabelNameandValue
                    labelName="Email"
                    value={getValuesStep1("email")}
                  />
                  <LabelNameandValue
                    labelName="Branch"
                    value={getValuesStep1("branch")}
                  />
                  <LabelNameandValue
                    labelName="Phone Number"
                    value={getValuesStep1("phoneNumber")}
                  />
                  <LabelNameandValue
                    labelName="Address"
                    value={getValuesStep1("address")}
                  />
                  <LabelNameandValue
                    labelName="Brand Logo"
                    value=""
                    imgFile={getValuesStep2("brandLogo")[0]}
                  />
                  <LabelNameandValue
                    labelName="Facebook Url"
                    value={getValuesStep2("facebookUrl")}
                  />
                  <LabelNameandValue
                    labelName="Instagram Url"
                    value={getValuesStep2("instaUrl")}
                  />
                </div>
              </div>
              <div className="flex justify-between w-[90%] pt-2 absolute bottom-4">
                <Button
                  styles="basic"
                  name="Back"
                  classNames="bg-white"
                  onClick={handleGoBack}
                />
                <Button
                  type="submit"
                  name="Submit"
                  onClick={handleOnSubmitForm}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboard;

type SignatureBlockProps = {
  name: string;
  role: string;
  signature: File;
};
const SignatureBlock = ({ name, role, signature }: SignatureBlockProps) => {
  return (
    <div>
      <img
        className="shadow-lg w-10 h-10 sm:w-40 sm:h-40 mb-4"
        src={URL.createObjectURL(signature)}
      />
      <span className="text-xs font-semibold block font-mono text-slate-700">
        {name}
      </span>
      <span className="text-xs block font-semibold text-slate-700">{role}</span>
    </div>
  );
};
const LabelNameandValue = ({
  labelName,
  value,
  imgFile,
}: {
  labelName: string;
  value: string | undefined;
  imgFile?: File;
}) => {
  return (
    <div className="flex shadow-sm pr-2 py-4 sm:p-4 relative">
      <span className="text-xs w-[30vw] sm:w-40 lg:w-60 sm:font-bold">{labelName}:</span>
      {value && <span className="text-xs text-gray-500 max-w-[60vw]  right-0 sm:text-sm ">{value}</span>}
      {imgFile && (
        <img
          className="w-20 rounded-full shadow-md h-20"
          src={URL.createObjectURL(imgFile)}
        />
      )}
    </div>
  );
};
