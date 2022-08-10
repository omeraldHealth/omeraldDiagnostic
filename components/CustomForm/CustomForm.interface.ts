import { ReportParamsData, ReportTypes } from "middleware/models.interface";

export interface CustomFormProps {
  formType: ReportTypes;
  onReportSubmitForm: (val: ReportParamsData[]) => void;
}
