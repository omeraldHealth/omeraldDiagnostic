import React from "react";
import { CustomFormProps } from "./CustomForm.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { formatFormData } from "@/utils/helper";
import { ReportParamsData } from "middleware/models.interface";
import InputGroup from "../core/InputGroup/InputGroup.component";
import Button from "../core/Button/Button.component";

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
      <label className="block text-sm font-medium text-gray-700 pb-5">
        {formType.testName}
      </label>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {formType.keywords.map((val) => (
          <div key={val.keyword}>
            <div className="block">
              <div className="flex items-center">
                <div className="w-[500px]">
                  <InputGroup
                    labelName={val.keyword}
                    inputName={val.keyword}
                    inputType="number"
                    placeholder="Add value"
                    register={register}
                    error={errors[val.keyword]?.message as string}
                  />
                </div>

                <span className="border-2 border-md bg-gray-400 max-w-10 max-h-10 ">
                  {val.unit}
                </span>
                <span className="border-2 border-md bg-gray-400 max-w-10 max-h-10">
                  {val.normalRange}
                </span>
              </div>

              {/* <label className="">{val.keyword}</label> */}
              {/* <input
                {...register(val.keyword)}
                name={val.keyword}
                className="border-2 border-black-2 mx-2 "
                placeholder={val.keyword}
                type="number"
              /> */}
            </div>
          </div>
        ))}
        <div className=" pt-4 flex justify-center">
          <Button name="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CustomFormComponent;
