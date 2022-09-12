import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/lib/auth";
import { setUserDetails } from "@/lib/db";
import * as yup from "yup";
import { useRouter } from "next/router";
import InputGroup from "@/components/core/InputGroup/InputGroup.component";
import TextArea from "@/components/core/TextArea/TextArea.component";
import Button from "@/components/core/Button/Button.component";
import { imageWidthAndHeight } from "@/utils/helper";

type BasicDetailsForm = {
  fullName: string;
  diagnosticName: string;
  email: string;
  address: string;
  phoneNumber: string;
  department: string;
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
  department: yup.string().required(),
});
const schemaStep2 = yup.object().shape({
  brandLogo: yup
    .mixed()
    .test("length", "Logo is Required", (value) => value.length == 1)
    .test(
      "type",
      "Unsupported File Format (Only jpg, jpeg, png format are allowed)",
      (value) =>
        ["image/jpg", "image/jpeg", "image/png"].includes(
          value && value[0]?.type
        )
    )
    .test(
      "size",
      "File Size is too large",
      (value) => value && value[0]?.size <= 10000
    ),
  // .test(
  //   "dimensions",
  //   "Minimum dimension should be 200 pixels x 67 pixels or the maximum dimensions should be 900 pixels width x 300 pixels height maintaining the aspectRatio of 1:3",
  //   async (value) => {
  //     if (value?.length === 1) {
  //       const dimensions = (await imageWidthAndHeight(value[0])) as {
  //         width: number;
  //         height: number;
  //       };
  //       if (
  //         dimensions.width >= 200 &&
  //         dimensions.height >= 67 &&
  //         dimensions.width <= 900 &&
  //         dimensions.height <= 300 &&
  //         Number(dimensions.width / dimensions.height) === Number(1 / 3)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     } else {
  //       return false;
  //     }
  //   }
  // )
  facebookUrl: yup.string().url("Please Enter a valid Url"),
  instaUrl: yup.string().url("Please Enter a valid Url"),
});

const Onboard = () => {
  const { user, diagnosticDetails, signIn } = useAuth();

  const [currentStep, setCurrentStep] = useState(steps[1]);

  const {
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
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2, isValid: isValidStep2 },
  } = useForm<BrandDetailsForm>({
    mode: "onChange",
    resolver: yupResolver(schemaStep2),
  });
  const brandLogoFile = getValuesStep2("brandLogo");
  // console.log(isValidStep2);
  console.log(errorsStep2.brandLogo);
  const router = useRouter();

  const handleOnSubmitForm = async (data: BasicDetailsForm) => {
    const token = (await user?.getIdToken()) || "invalid";
    const res = await setUserDetails(token, data);
    console.log(res);
    if (res.status == 201 && user) {
      signIn(user, "/dashboard");
    }

    if (res.status === 409) {
      console.log("changing route");
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

  return (
    <div className="grid  h-screen place-content-center">
      <div className="flex flex-col md:min-w-[500px] shadow-lg rounded-md border-2 p-10">
        <div id="steps" className="rounded-md bg-slate-50 w-full p-4 mb-4">
          {steps.map((step, index) => (
            <Fragment key={index}>
              <span
                id="stepId"
                className={`rounded-full shadow-sm text-xs p-2 px-3  ${
                  currentStep.id === step.id && "bg-blue-700 text-white"
                }
                ${currentStep.id < step.id && "bg-white text-blue-700"}
                ${currentStep.id > step.id && "bg-primary text-white"}`}
              >
                {step.id}
              </span>
              <span
                id="stepName"
                className={`mx-4 text-xs ${
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
                  className={`border mx-2 h-0 w-10 mb-1 inline-block ${
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
              <InputGroup
                labelName="Diagnostic Centre Name"
                inputName="diagnosticName"
                placeholder="Add Diagnostic name"
                error={errors.diagnosticName?.message}
                register={register}
              />
              <InputGroup
                labelName="Full Name"
                inputName="fullName"
                placeholder="Add your name"
                error={errors.fullName?.message}
                register={register}
              />
              <InputGroup
                labelName="Email"
                inputName="email"
                placeholder="example@example.com"
                error={errors.email?.message}
                register={register}
              />
              <InputGroup
                value={user && user.phoneNumber ? user.phoneNumber : ""}
                labelName="Phone Number"
                inputName="phoneNumber"
                placeholder="Add your phone"
                error={errors.phoneNumber?.message}
                register={register}
              />
              <InputGroup
                labelName="Department"
                inputName="department"
                placeholder="Add Department Name"
                error={errors.department?.message}
                register={register}
              />
              <TextArea
                labelName="Address"
                inputName="address"
                error={errors.address?.message}
                placeholder="Add your address"
                register={register}
              />

              <div className="flex justify-between pt-2">
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
              <InputGroup
                labelName="Upload Brand Logo"
                inputName="brandLogo"
                placeholder="Upload Brand Logo"
                error={errorsStep2.brandLogo?.message}
                register={registerStep2}
                inputType="file"
              />

              {!Boolean(errorsStep2.brandLogo) &&
                brandLogoFile?.length == 1 && (
                  <img
                    src={URL.createObjectURL(getValuesStep2("brandLogo")[0])}
                  />
                )}

              <InputGroup
                labelName="Facebook Url"
                inputName="facebookUrl"
                placeholder="Add Facebook Url"
                error={errorsStep2.facebookUrl?.message}
                register={registerStep2}
              />
              <InputGroup
                labelName="Instagram Url"
                inputName="instaUrl"
                placeholder="Add Instagram Url"
                error={errorsStep2.instaUrl?.message}
                register={registerStep2}
              />

              <div className="flex justify-between pt-2">
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
            <form id="reportDetails" onSubmit={handleSubmit(handleOnContinue)}>
              <h1>Report Details form</h1>
              <div className="flex justify-between pt-2">
                <Button
                  styles="basic"
                  name="Back"
                  classNames="bg-white"
                  onClick={handleGoBack}
                />
                <Button styles="basic" type="submit" name="Continue" />
              </div>
            </form>
          )}
          {currentStep.id == 4 && (
            <form id="summary" onSubmit={handleSubmit(handleOnContinue)}>
              <h1> Summaryform</h1>
              <div className="flex justify-between pt-2">
                <Button
                  styles="basic"
                  name="Back"
                  classNames="bg-white"
                  onClick={handleGoBack}
                />
                <Button type="submit" name="Submit" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboard;
