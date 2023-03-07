import { ObjectId } from "mongodb";
import { User } from "firebase/auth";

export interface DiagnosticUserSession {
    userId: string;
    token: string;
}

export interface UserDetails {
  email: string;
  updatedAt?: Date;
  reports?: string[];
  tests: ReportTypes[];
  phoneNumber: string;
  diagnosticName: string;
  sharedReport?: string[];
  branchDetails?: BranchDetail[],
  activities?: ActivityDetails[];
  brandDetails: BrandDetailsForm;
  managersDetail: IManagerDetails[];
  pathologistDetail?: IPathologistDetails[];
}

export type BrandDetailsForm = {
  brandLogo: string;
  brandBanner: string;  
  instaUrl?: string;
  facebookUrl?: string;
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

export type UserQuery = {
  phoneNumber:String,
  name:String,
  email:String,
  branch:String,
  subject:String,
  message:String
}

export type SampleTypes = {
  _id: ObjectId;
  sampleName: string;
  keywords: ReportParamsType[];
};

export type ReportTypes = {
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

export type ReportParamsData = Pick<ReportParamsType,"keyword" | "unit" | "normalRange"> & { value: string };

export type ReportDetails = {
  dob: Date;
  email: string;
  gender: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  userName: string;
  testName: string;
  reportDate: Date;
  reportId?: string;
  reportUrl?: string;
  doctorName?: string;
  isManualReport: boolean;
  status: "parsed" | "parsing";
  parsedData?: ReportParamsData[];
};

export type ActivityDetails = {
  activity: string;
  updatedTime?: Date;
  user:IManagerDetails
};

export interface AuthContextInterface {
	user: User | null
    diagnosticDetails: UserDetails | null;
    loading: boolean;
    signIn: (user: User, redirect: string) => Promise<void>;
    signOut: () => Promise<void>;
    setDiagnosticDetails:() => Promise<void>;
}