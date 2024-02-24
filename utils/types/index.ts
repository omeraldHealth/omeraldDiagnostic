export type IManagerDetailsInterface = {
    managerName: string;
    managerRole: string;
    managerContact: string;
  };
  
  export type ReportTypes = {
    sampleName: string;
    sampleType: {
      testName: string;
      keywords: string[];
    };
  };
  
  export type BranchDetailInterface = {
    branchName: string;
    branchEmail: string;
    branchAddress: string;
    branchContact: string;
    branchManager: string;
  };
  
  export interface ActivityDetailsInterface {
    activity: string;
    updatedTime?: Date;
    user: IManagerDetailsInterface;
    branchId: string;
  }
  
  export interface BrandDetailsFormInterface {
    brandLogo: string;
    brandBanner: string;
    instaUrl?: string;
    facebookUrl?: string;
  }
  
  export type IPathologistDetails = {
    name: { type: String };
    designation: { type: String };
    signature: { type: String };
    branchId: { type: String };
  };
  
  export interface ProfileDetailsInterface {
    email: string;
    updatedAt?: Date;
    reports?: string[];
    tests: ReportTypes[];
    phoneNumber: string;
    diagnosticName: string;
    sharedReport?: string[];
    branchDetails?: BranchDetailInterface[];
    activities?: ActivityDetailsInterface[];
    brandDetails: BrandDetailsFormInterface;
    managersDetail: IManagerDetailsInterface[];
    pathologistDetail?: IPathologistDetails[];
    managerName?: string;
  };
  