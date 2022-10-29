import { ReportDetails, UserDetails } from "middleware/models.interface";

export interface PdfTestingProps {
  report: ReportDetails;
  diagnosticDetails: UserDetails;
}
