import React from "react";
import { CustomFormProps } from "./CustomForm.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { formatFormData } from "@/utils/helper";
import { ReportParamsData } from "middleware/models.interface";

const CustomFormComponent = ({
  formType,
  onReportSubmitForm,
}: CustomFormProps) => {
  //Trying dynamic Validation
  const testingSchema = {};
  formType.keywords.forEach((params) => {
    testingSchema[params.keyword] = yup.string().required();
  });

  const schema = yup.object().shape(testingSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmitForm = (formData: Record<string, string>) => {
    const finalData: ReportParamsData[] = formatFormData(
      formData,
      formType.keywords
    );
    onReportSubmitForm(finalData);
  };
  return (
    <div>
      <h2 className="text-center">{formType.testName}</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {formType.keywords.map((val) => (
          <div key={val.keyword}>
            <div className="block">
              <label className="">{val.keyword}</label>
              <input
                {...register(val.keyword)}
                name={val.keyword}
                className="border-2 border-black-2 mx-2 "
                placeholder={val.keyword}
                type="number"
              />
              <span className="border-2 border-md bg-gray-400 ">
                {val.unit}
              </span>
              <span className="border-2 border-md bg-gray-400 ">
                {val.normalRange}
              </span>
            </div>
            <span className={"text-red-500"}>
              {errors[val.keyword]?.message}
            </span>{" "}
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
