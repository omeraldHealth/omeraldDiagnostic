export type BasicReportFormProps = {
  onBasicFormSubmit: (val: ReportUserDetails) => void;
};
export type ReportUserDetails = {
  userName: string;
  email: string;
  phoneNumberInput: string;
  reportDate: Date;
  department?: string;
  doctorName?: string;
  message?: string;
};
