
interface InputGroupProps {
  disabled?: boolean;
  value?: string;
  labelName: string;
  inputName: string;
  error: string | undefined;
  placeholder: string;
  inputType?: string;
  register: UseFormRegister<any>; //TODO: Imporve this useForm Type
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (val?: any) => boolean;
}
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
// import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { UseFormRegister } from "react-hook-form";

export default function InputGroup({
  value,
  disabled,
  labelName,
  error,
  inputName,
  placeholder = "",
  inputType = "text",
  register,
  ...props
}: InputGroupProps) {
  return (
    <div>
      <label
        htmlFor={inputName}
        className="sm:block text-xs sm:text-sm sm:font-medium text-gray-700"
      >
        {labelName}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm mb-2">
        <input
          {...props}
          value={value}
          disabled={disabled}
          {...register(inputName, {
            onChange: props.onChange,
            validate: props.validate,
          })}
          type={inputType}
          name={inputName}
          id={inputName}
          className={`block w-full pr-10 text-xs text-gray-500 sm:text-sm rounded-md placeholder:text-xs file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-xs 
          file:bg-indigo-700 file:text-white
          hover:file:bg-primary 
          ${
            inputType === "string"  && "border border-solid p-2"}
          ${
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
        <p
          className="mt-2 text-sm text-red-600 w-full block"
          id={`${inputName}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
