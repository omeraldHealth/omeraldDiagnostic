import { ObjectId, Timestamp } from "mongodb";

export interface UserDetails {
  diagnosticName: string;
  fullName: string;
  tests: TestTypes[];
  phoneNumber: string;
  branch: string;
  email: string;
  sharedReport?: string[];
  address?: string;
  reports?: string[];
  branchDetails?: BranchDetail[],
  updatedAt?: Date;
  brandDetails: BrandDetailsForm;
  managersDetail: IManagerDetails[];
  activities?: ActivityDetails[];
  pathologistDetail?: IPathologistDetails[];
}

export type BrandDetailsForm = {
  brandLogo: string;
  facebookUrl?: string;
  instaUrl?: string;
};
export type IManagerDetails = {
  managerName: string;
  managerRole: string;
  managerContact: string;
};

export type IPathologistDetails = {
  name: string;
  designation: string;
  signature: string;
};

export type BranchDetail = {
  branchName: String,
  branchEmail: String,
  branchAddress: String,
  branchContact: String,
  branchManager: IManagerDetails,
}

export type Query = {
  phoneNumber:String,
  name:String,
  email:String,
  branch:String,
  subject:String,
  message:String
}
export interface DiagnosticUserSession {
  userId: string;
  token: string;
}
export type SampleTypes = {
  _id: ObjectId;
  sampleName: string;
  keywords: ReportParamsType[];
};

export type TestTypes = {
  _id: ObjectId;
  testName: string;
  sampleType: SampleTypes
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
export type ActivityDetails = {
  activity: string;
  updatedTime?: Date;
  user:IManagerDetails
};