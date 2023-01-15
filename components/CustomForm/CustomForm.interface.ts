import { ReportParamsData, ReportTypes, TestTypes } from "middleware/models.interface";

export interface CustomFormProps {
  formType: ReportTypes | TestTypes;
  onReportSubmitForm: (val: ReportParamsData[]) => void;
}
