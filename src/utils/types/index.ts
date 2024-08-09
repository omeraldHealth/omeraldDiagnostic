import { ColumnsType } from "antd/es/table";

 export type BlogDataType = {
    title :string,
    description: string;
    url:string;
    date :string;
  }

export interface UserNavigationItem {
  name: string;
  href: string;
}

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
    _id?: string
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
    centerName: {type:String},
    phoneNumber: {type:String},
    ownerId:  {type:String},
    brandingInfo: {type: Object},
    branches:  {type: [Object]},
    email:  {type:String},
    updatedAt: {type: Date}, 
  };
  
  export interface ReportSummaryProps {
    handleSuccess: () => void;
    report?: any;
    style: string;
    isManual?: boolean
  }

  export interface ProfileSummaryCardProps {
    title: string;
    value: string;
    link?: string;
  }

  export interface ReportSummaryCompProps {
    profile: any;
    style: string;
    isManual?: boolean
    handleSuccess: () => void;
  }
  
  export interface TestTableProps {}

  export interface ViewTestProps {
    columns: ColumnsType<any>;
    tests: any[];
    loading: boolean;
  }

  export interface EditTestsProps {
    form: any; // Replace with the appropriate type for your form
    editElement: boolean;
    handleSubmit: (values: any) => void;
    defaultValues: any;
  }

  export interface TestToggleProps {
    showTest: boolean;
    setShowTest: React.Dispatch<React.SetStateAction<boolean>>;
  }