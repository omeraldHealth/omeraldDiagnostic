import { ReportDetails, ReportTypes } from "./users.interface";

export type BasicDetailsForm = {
    diagnosticName: string;
    phoneNumber: string,
    email: string;
};

export type BrandDetailsForm = {
    brandLogo: FileList;
    brandBanner: FileList;
    facebookUrl?: string;
    instaUrl?: string;
};

export type BranchDetails = {
    branchName: string,
    branchEmail: string,
    branchAddress: string,
    branchContact: string,
    branchManager: string,
    managerName: string;
    managerRole: string;
    managerContact: string;
};

export type IManagerDetails = {
    managerName: string;
    managerRole: string;
    managerContact: string;
};

export type FormType = {
    name:string,
    type:string,
    label:string,
    required:boolean
};

export const basicFormArray:FormType[] = [
    {"name":"diagnosticName","type":"text","label":"Diagnostic Name","required":true},
    {"name":"email","type":"text","label":"Email","required":true},
    {"name":"phoneNumber","type":"text","label":"Phone Number","required":true}
]
  
export const brandDetailsFormArray:FormType[] = [
    {"name":"brandLogo","type":"logo","label":"Brand Logo","required":true,pattern:""},
    {"name":"brandBanner","type":"banner","label":"Brand Banner","required":false,pattern:""},
    {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true,pattern:"/.*facebook\.com.*/"},
    {"name":"instaUrl","type":"text","label":"Instagram Url","required":true,pattern:"/.*instagram\.com.*/"},
]
  
export const branchDetailsFormArray: FormType[] = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"managerName","type":"text","label":"Manager Name","required":true,pattern:""},
    {"name":"branchEmail","type":"email","label":"Branch Email","required":false,pattern:""},
    {"name":"managerContact","type":"text","label":"Manager Contact","required":true,pattern:""},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
    {"name":"managerRole","type":"roles","label":"Manager Role","required":true,pattern:""},
    {"name":"branchContact","type":"text","label":"Branch Contact","required":true},
  
]

export const initialTestState : ReportTypes = {
	sampleName:"",
	//@ts-ignore
	sampleType:{
	  testName:"",
	  keywords:[]
	}
}

export const initialReportState : ReportDetails[] = []

export const initialReportFormState : ReportDetails =  { 
    //@ts-ignore
    dob: "",
    email: "",
    gender: "",
    userId: "",
    userName: "",
    testName: "",
     //@ts-ignore
    reportDate: "",
    reportId: "",
    reportUrl: "",
    doctorName: "",
    isManualReport: false,
    //@ts-ignore
    status: "parsing",
    //@ts-ignore
    parsedData: []
}

export const intialDiagnosticState = {
    tests: [],
    sharedReport: [],
    phoneNumber: "",
    diagnosticName: "",
    email: "",
    brandDetails: [
        {
            facebookUrl: "",
            instaUrl: "",
            brandLogo: ""
        }
    ],
    managersDetail: [
        {
            managerName: "",
            managerRole: "",
            managerContact: ""
        }
    ],
    activities: []
}
