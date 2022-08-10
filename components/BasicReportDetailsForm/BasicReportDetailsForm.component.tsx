import React, { ReactComponentElement, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  BasicFormType,
  BasicReportFormProps,
} from "./BasicReportDetailsForm.interface";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "yup-phone";
const styles = {
  inputStyle: "border-2 border-black-2 mx-2 block ",
  btnStyle: "border-2 border-md bg-blue-400 active:bg-blue-700",
  errorStyle: "text-red-500",
};

const BasicReportDetailsForm = ({
  onBasicFormSubmit,
}: BasicReportFormProps) => {
  const [countryCode, setCountryCode] = useState("IN");

  const schema = yup.object().shape({
    fullName: yup.string().strict().required(),
    email: yup.string().email().required(),
    phoneNumberInput: yup
      .string()
      .phone(countryCode, true, "Invalid Phone Number")
      .required(),
    bookingDate: yup.date().required(),
    department: yup.string(),
    doctorName: yup.string().strict(),
    message: yup.string(),
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicFormType>({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data: BasicFormType) => {
    console.log(data);
    onBasicFormSubmit(data);
  };

  return (
    <div>
      <h2 className="text-center">Basic Details</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <input
          {...register("fullName")}
          name="fullName"
          className={styles.inputStyle}
          placeholder="Full Name"
        />
        <span className={styles.errorStyle}>{errors.fullName?.message}</span>{" "}
        <input
          {...register("email")}
          name="email"
          className={styles.inputStyle}
          placeholder="Email"
        />
        <span className={styles.errorStyle}>{errors.email?.message}</span>
        <PhoneInputWithCountrySelect
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
        <input
          {...register("bookingDate")}
          name="bookingDate"
          className={styles.inputStyle}
          type="date"
          placeholder="Booking Date"
        />
        <span className={styles.errorStyle}>{errors.bookingDate?.message}</span>
        <input
          {...register("department")}
          name="department"
          className={styles.inputStyle}
          placeholder="Department"
        />
        <span className={styles.errorStyle}>{errors.department?.message}</span>
        <input
          {...register("doctorName")}
          name="doctorName"
          className={styles.inputStyle}
          placeholder="Doctor Name"
        />
        <span className={styles.errorStyle}>{errors.doctorName?.message}</span>
        <textarea
          {...register("message")}
          name="message"
          className={styles.inputStyle}
          placeholder="Message"
        />
        <span className={styles.errorStyle}>{errors.message?.message}</span>
        <button type="submit" className={styles.btnStyle}>
          Submit User Details
        </button>
      </form>
    </div>
  );
};

export default BasicReportDetailsForm;
