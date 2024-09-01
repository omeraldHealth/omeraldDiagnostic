import { ObjectId } from 'mongodb';

export interface UserQueryInterface {
  phoneNumber: string;
  name: string;
  email: string;
  branch: string;
  subject: string;
  message: string;
}

export interface ActivityDetailsInterface {
  activity: string;
  updatedTime?: Date;
  user: ManagerDetailsInterface;
  branchId: string;
}

export interface BranchDetailInterface {
  branchName: string;
  branchEmail: string;
  branchAddress: string;
  branchContact: string;
  branchManager: ManagerDetailsInterface;
}

export interface PathologistDetailsInterface {
  name: string;
  designation: string;
  signature: string;
}

export interface ManagerDetailsInterface {
  managerName: string;
  managerRole: string;
  managerContact: string;
}

export interface BrandDetailsFormInterface {
  brandLogo: string;
  brandBanner: string;
  instaUrl?: string;
  facebookUrl?: string;
}

export interface AuthContextInterface {
  user: any | null;
  diagnosticDetails: UserDetailsInterface | null;
  operator: any | null;
  activeBranch: any;
  loading: boolean;
  signIn: (user: any, redirect: string) => Promise<void>;
  signOut: () => Promise<void>;
  setActiveBranch: () => void;
}

export interface UserDetailsInterface {
  email: string;
  updatedAt?: Date;
  reports?: string[];
  tests: ReportTypeInterface[];
  phoneNumber: string;
  diagnosticName: string;
  sharedReport?: string[];
  branchDetails?: BranchDetailInterface[];
  activities?: ActivityDetailsInterface[];
  brandDetails: BrandDetailsFormInterface;
  managersDetail: ManagerDetailsInterface[];
  pathologistDetail?: PathologistDetailsInterface[];
  managerName?: string;
}

export interface ReportParamsTypeInterface {
  _id: ObjectId;
  keyword: string;
  aliases: string[];
  minRange: string;
  maxRange: string;
  unit: string;
}

export interface ReportDetailsInterface {
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
  status: 'parsed' | 'parsing';
  // parsedData?: ReportParamsDataInterface[];
}

export interface ReportTypeInterface {
  _id: ObjectId;
  sampleName: string;
  sampleType: SampleTypesInterface;
}

export interface SampleTypesInterface {
  _id: ObjectId;
  testName: string;
  keywords: ReportParamsTypeInterface[];
}

export interface UserSessionInterface {
  userId: string;
  token: string;
}

export const initialAuthContext: AuthContextInterface = {
  user: null,
  diagnosticDetails: null,
  activeBranch: null,
  operator: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {},
  setActiveBranch: async () => {},
};

export const allowedPaths: string[] = ['/', '/signIn', '/404'];
