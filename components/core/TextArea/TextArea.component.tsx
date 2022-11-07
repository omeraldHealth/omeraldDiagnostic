import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type TextAreaProps = {
  labelName: string;
  inputName: string;
  error: string | undefined;
  placeholder: string;
  inputType?: string;
  register: (val: any) => any; //TODO: Imporve this useForm Type
};

export default function TextArea(props: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        {props.labelName}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm mb-2">
        <textarea
          {...props.register(props.inputName)}
          rows={4}
          name={props.inputName}
          id={props.inputName}
          placeholder={props.placeholder}
          className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md ${
            props.error &&
            " border-red-300 text-red-900  focus:ring-red-500 focus:border-red-500 placeholder-red-300"
          }`}
          defaultValue={""}
        />
        {props.error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mb-5">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {props.error && (
          <p
            className="mt-2 text-sm text-red-600"
            id={`${props.inputName}-error`}
          >
            {props.error}
          </p>
        )}
      </div>
    </div>
  );
}
