import { ReportDetailsInterface } from '../../../utils';
import { ProfileDetailsInterface } from '../../../utils/types';

export interface PdfTestingProps {
  report: ReportDetailsInterface;
  diagnosticDetails: ProfileDetailsInterface;
}
