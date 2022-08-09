import React from "react";
import { CustomFormProps } from "./CustomForm.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// const styles={
//     labelStyle:""
//     label
// }

const CustomFormComponent = ({ form }: CustomFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const schema = yup.object().shape({
    // diagnosticName: yup.string().strict().required(),
    // fullName: yup.string().strict().required(),
    // email: yup.string().email().required(),
    // address: yup.string().required(),
  });
  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-center">{form.testName}</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        {form.keywords.map((val) => (
          <div className="block" key={val.keyword}>
            <label className="">{val.keyword}</label>
            <input
              {...register(val.keyword)}
              name={val.keyword}
              className="border-2 border-black-2 mx-2 "
              placeholder={val.keyword}
              type="number"
            />
            <span className="border-2 border-md bg-gray-400 ">{val.unit}</span>
            <span className="border-2 border-md bg-gray-400 ">
              {val.normalRange}
            </span>
          </div>
        ))}
        <button className="border-2 border-md bg-blue-400 active:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomFormComponent;
