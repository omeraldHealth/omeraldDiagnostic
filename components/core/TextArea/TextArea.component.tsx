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
      <div className="mt-1">
        <textarea
          {...props.register(props.inputName)}
          rows={4}
          name={props.inputName}
          id={props.inputName}
          placeholder={props.placeholder}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          defaultValue={""}
        />
      </div>
    </div>
  );
}
