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
  errorStyle: "text-red-500",
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
    console.log(data);
    onBasicFormSubmit(data);
  };

  return (
    <div className="md:w-full">
      {/* <h1 className="text-center">Basic Details</h1> */}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="grid md:grid-cols-2 md:gap-4">
          <InputGroup
            labelName="User Name"
            inputName="userName"
            error={errors.userName?.message}
            placeholder="Add Your Name"
            register={register}
          />

          <div id="gender">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 pb-3"
            >
              Gender
            </label>
            <div className="flex flex-1 justify-between ">
              <span>
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
              <span>
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
              <span>
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
          <InputGroup
            labelName="Date of Birth"
            inputName="dob"
            inputType={"date"}
            error={errors.dob?.message}
            placeholder="Add Your Date of Birth"
            register={register}
          />

          <InputGroup
            labelName="Email"
            inputName="email"
            error={errors.email?.message}
            placeholder="example@example.com"
            register={register}
          />
          {/* <input
          {...register("fullName")}
          name="fullName"
          // className={styles.inputStyle}
          placeholder="Full Name"
        />
        <span className={styles.errorStyle}>{errors.fullName?.message}</span> */}
          {/* <input
          {...register("email")}
          name="email"
          className={styles.inputStyle}
          placeholder="Email"
        />
        <span className={styles.errorStyle}>{errors.email?.message}</span> */}

          <InputGroup
            labelName="Report Date"
            inputName="reportDate"
            inputType={"date"}
            error={errors.reportDate?.message}
            placeholder="Add Your Report Date"
            register={register}
          />
          {/* <input
          {...register("bookingDate")}
          name="bookingDate"
          className={styles.inputStyle}
          type="date"
          placeholder="Booking Date"
        />
        <span className={styles.errorStyle}>{errors.bookingDate?.message}</span> */}

          <InputGroup
            disabled
            labelName="Department"
            inputName="department"
            error={errors.department?.message}
            placeholder="Add Report Department"
            value={diagnosticDetails?.department}
            register={register}
          />
          <InputGroup
            labelName="Doctor Name"
            inputName="doctorName"
            error={errors.doctorName?.message}
            placeholder="Add your doctor"
            register={register}
          />
          {/* <input
          {...register("department")}
          name="department"
          className={styles.inputStyle}
          placeholder="Department"
        />
        <span className={styles.errorStyle}>{errors.department?.message}</span> */}
          {/* <input
          {...register("doctorName")}
          name="doctorName"
          className={styles.inputStyle}
          placeholder="Doctor Name"
        />
        <span className={styles.errorStyle}>{errors.doctorName?.message}</span> */}
          <div>
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
            <span className={styles.errorStyle}>
              {errors.phoneNumberInput?.message}
            </span>
          </div>
          <TextArea
            labelName="Message"
            inputName="message"
            error={errors.message?.message}
            placeholder={"Add message"}
            register={register}
          />
        </div>
        {/* <textarea
          {...register("message")}
          name="message"
          className={styles.inputStyle}
          placeholder="Message"
        />
        <span className={styles.errorStyle}>{errors.message?.message}</span> */}
        <span className="w-full flex place-content-center pt-2">
          <Button styles="basic" type="submit" name="Continue" />
        </span>
        {/* <button type="submit" className={styles.btnStyle}>
          Submit User Details
        </button> */}
      </form>
    </div>
  );
};

export default BasicReportDetailsForm;
