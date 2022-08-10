export type BasicReportFormProps = {
  onBasicFormSubmit: (val: BasicFormType) => void;
};
export type BasicFormType = {
  fullName: string;
  email: string;
  phoneNumberInput: string;
  bookingDate: Date;
  department?: string;
  doctorName?: string;
  message?: string;
};
