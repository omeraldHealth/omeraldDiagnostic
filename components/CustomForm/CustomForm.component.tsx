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
      <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-3 gap-4 mb-14">
        {formType.keywords.map((val) => (
          <div key={val.keyword} className="max-h-[30vh] overflow-y-auto">
            <div className="block">
              <div className="sm:flex items-center">
                <div className="w-[500px]">
                  <InputGroup
                    labelName={val.keyword+" ("+val.unit+" "+val.normalRange+")"}
                    inputName={val.keyword}
                    inputType="number"
                    placeholder="Add value"
                    register={register}
                    error={errors[val.keyword]?.message as string}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[93%]  pl-10 Vism:pl-5 xl:pl-0 flex justify-between pt-6 absolute bottom-10 right-10">
            <button type="submit"  name="Upload Report" className="block w-auto sm:w-[130px] bg-gray-400 text-white p-2 text-sm rounded-md">Back</button>     
            <button type="submit" name="Submit" className="block w-auto sm:w-[220px] bg-blue-800 text-white p-2 text-sm rounded-md">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default CustomFormComponent;
