import React, { ReactComponentElement, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ReportUserDetails,
  BasicReportFormProps,
} from "./BasicReportDetailsForm.interface";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "yup-phone";
import InputGroup from "../core/InputGroup/InputGroup.component";
import TextArea from "../core/TextArea/TextArea.component";
import Button from "../core/Button/Button.component";
import { useAuth } from "../../lib/auth";
const styles = {
  errorStyle: "mt-2 text-sm text-red-600 w-full block",
};

const BasicReportDetailsForm = ({
  onBasicFormSubmit,
}: BasicReportFormProps) => {
  const [countryCode, setCountryCode] = useState("IN");
  const { diagnosticDetails } = useAuth();

  const schema = yup.object().shape({
    userName: yup.string().required().strict(),
    email: yup.string().email().required(),
    dob: yup
      .date()
      .required()
      .max(new Date(), "Please choose past date!")
      .nullable()
      .typeError("Invalid Date"),
    gender: yup
      .string()
      .nullable()
      .required()
      .oneOf(["Male", "Female", "Others"]),
    phoneNumberInput: yup
      .string()
      .required("Phone no is required")
      .phone(countryCode, true, "Invalid Phone Number"),
    reportDate: yup
      .date()
      .required()
      .max(new Date(), "Please choose past date!")
      .nullable()
      .typeError("Invalid Date"),

    department: yup.string(),
    doctorName: yup.string().strict(),
    message: yup.string(),
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportUserDetails>({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data: ReportUserDetails) => {
    onBasicFormSubmit(data);
  };

  return (
    <div className="md:w-full">
      <section className="w-[100%] xl:w-[100%] h-auto min-h-[40vh] rounded-md p-8 bg-white">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3  md:gap-4">
            <InputGroup
              labelName="Patient Name *"
              inputName="userName"
              error={errors.userName?.message}
              placeholder="Add Your Name"
              register={register}
            />
            <InputGroup
              labelName="Email *"
              inputName="email"
              error={errors.email?.message}
              placeholder="example@example.com"
              register={register}
            />
            <div>
              <p className="text-sm font-normal mb-1">Enter phone number *</p>
              <div
                className={`border rounded-md pl-2 border-gray-500
            ${
              errors.phoneNumberInput?.message
                ? " !border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500 placeholder-red-300"
                : "focus:border-primary focus:ring-primary "
            }`}
              >
                <PhoneInputWithCountrySelect
                  // inputClass="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  international={true}
                  onCountryChange={(country) =>
                    country === undefined
                      ? setCountryCode("IN")
                      : setCountryCode(country)
                  }
                  {...register("phoneNumberInput")}
                  //   value={phoneNumberInput}
                  name="phoneNumberInput"
                  defaultCountry="IN"
                  onChange={(value) => {
                    value === undefined
                      ? setValue("phoneNumberInput", "")
                      : setValue("phoneNumberInput", value);
                  }}
                />
              </div>
              <span className={styles.errorStyle}>
                {errors.phoneNumberInput?.message}
              </span>
            </div>
           
            <InputGroup
              labelName="Date of Birth *"
              inputName="dob"
              inputType={"date"}
              error={errors.dob?.message}
              placeholder="Add patients Date of Birth"
              register={register}
            />
            <InputGroup
              labelName="Report Date *"
              inputName="reportDate"
              inputType={"date"}
              error={errors.reportDate?.message}
              placeholder="Add Your Report Date"
              register={register}
            />
            <div id="gender">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 pb-3"
              >
                Gender *
              </label>
              <div className="flex flex-1">
                <span className="mr-4">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Male"
                    id="male"
                    name="gender"
                  />{" "}
                  <label className=" text-xs font-medium " htmlFor="male">
                    Male
                  </label>
                </span>
                <span className="mr-4">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Female"
                    id="female"
                    name="gender"
                  />{" "}
                  <label className=" text-xs font-medium " htmlFor="female">
                    Female
                  </label>
                </span>
                <span className="mr-4">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Others"
                    id="others"
                    name="gender"
                  />{" "}
                  <label className=" text-xs font-medium " htmlFor="others">
                    Others
                  </label>
                </span>
              </div>
              {errors.gender?.message && (
                <p
                  className="mt-2 text-sm text-red-600 w-full block"
                  id={`gender-error`}
                >
                  {errors.gender?.message}
                </p>
              )}
            </div> 
          </div>
          <hr className="my-3"></hr>
          <div className="grid md:grid-cols-2 md:gap-4">
          <InputGroup
              disabled
              labelName="Department"
              inputName="department"
              error={errors.department?.message}
              placeholder="Add Report Department"
              value={diagnosticDetails?.branch ?? ""}
              register={register}
            />
            <InputGroup
              labelName="Doctor Name"
              inputName="doctorName"
              error={errors.doctorName?.message}
              placeholder="Add your doctor"
              register={register}
            />
            
            <TextArea
              labelName="Message"
              inputName="message"
              error={errors.message?.message}
              placeholder={"Add message"}
              register={register}
            />
          </div>
          <span className="w-full flex justify-end pt-2">
            <button type="submit" name="Continue" className="block w-[220px] bg-blue-800 text-white p-2 text-sm rounded-md">Continue</button>
          </span>
        </form>
      </section>
    </div>
  );
};

export default BasicReportDetailsForm;
