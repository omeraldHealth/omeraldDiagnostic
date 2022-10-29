import { ObjectId, Timestamp } from "mongodb";

export interface UserDetails {
  diagnosticName: string;
  fullName: string;
  phoneNumber: string;
  department: string;
  email: string;
  address?: string;
  reports?: string[];
  updatedAt?: Date;
  brandDetails: BrandDetailsForm;
  managersDetail: IManagerDetails[];
}
export type BrandDetailsForm = {
  brandLogo: string;
  facebookUrl?: string;
  instaUrl?: string;
};
export type IManagerDetails = {
  managerName: string;
  managerRole: string;
  managerSignature: string;
};
export interface UserSession {
  userId: string;
  token: string;
}
export type ReportTypes = {
  _id: ObjectId;
  testName: string;
  keywords: ReportParamsType[];
};
export type ReportParamsType = {
  _id: ObjectId;
  keyword: string;
  aliases: string[];
  normalRange: string;
  unit: string;
};
export type ReportParamsData = Pick<
  ReportParamsType,
  "keyword" | "unit" | "normalRange"
> & { value: string };

export type ReportDetails = {
  userId: string;
  userName: string;
  email: string;
  gender: string;
  dob: Date;
  doctorName?: string;
  reportId?: string;
  reportUrl?: string;
  reportDate: Date;
  status: "parsed" | "parsing";
  testName: string;
  isManualReport: boolean;
  parsedData?: ReportParamsData[];
  createdAt?: Date;
  updatedAt?: Date;
};
