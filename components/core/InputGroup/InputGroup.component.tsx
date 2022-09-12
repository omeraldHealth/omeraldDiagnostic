/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
type InputGroupProps = {
  disabled?: boolean;
  value?: string;
  labelName: string;
  inputName: string;
  error: string | undefined;
  placeholder: string;
  inputType?: string;
  register: (val: any) => any; //TODO: Imporve this useForm Type
};
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { classNames } from "@/utils/helper";

export default function InputGroup({
  value,
  disabled,
  labelName,
  error,
  inputName,
  placeholder = "",
  inputType = "text",
  register,
}: InputGroupProps) {
  return (
    <div>
      <label
        htmlFor={inputName}
        className="block text-sm font-medium text-gray-700"
      >
        {labelName}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm mb-2">
        <input
          value={value}
          disabled={disabled}
          {...register(inputName)}
          type={inputType}
          name={inputName}
          id={inputName}
          className={`block w-full pr-10 sm:text-sm rounded-md placeholder:text-xs file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-xs 
          file:bg-indigo-700 file:text-white
          hover:file:bg-primary  ${
            inputType === "file" && "border border-solid p-1 "
          }
          ${
            inputType === "file" &&
            (error
              ? " focus:outline-red-500"
              : " border-gray-500 p-1 focus:outline-primary ")
          }
          ${
            error
              ? " border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500 placeholder-red-300"
              : "focus:border-primary focus:ring-primary "
          }`}
          placeholder={placeholder}
          aria-invalid="true"
          aria-describedby={`${inputName}-error`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${inputName}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
