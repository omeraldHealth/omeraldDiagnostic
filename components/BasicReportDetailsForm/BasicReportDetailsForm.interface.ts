export type BasicReportFormProps = {
  onBasicFormSubmit: (val: BasicFormType) => void;
};
export type BasicFormType = {
  userName: string;
  email: string;
  phoneNumberInput: string;
  reportDate: Date;
  department?: string;
  doctorName?: string;
  message?: string;
};
