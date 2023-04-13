import { ReportDetails, ReportTypes } from "./users.interface";

export const textPattern = /[^0-9]/
export const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const phonePattern = /^(?:\+91|0)?[6789]\d{9}$/
export const numberPattern = /^[1-50000]+$/

export type BasicDetailsForm = {
    diagnosticName: string;
    phoneNumber: string,
    email: string;
    managerName: string;
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
    pattern?:RegExp,
};

export const profileForm: FormType[] = [
    {"name":"brandLogo","type":"image","label":"Logo","required":true},
    {"name":"diagnosticName","type":"text","label":"Diagnostic Center Name","required":true},
    {"name":"email","type":"email","label":"Email","required":true,pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true},
    {"name":"instaUrl","type":"text","label":"Instagram Url","required":true},
]

export const selectForm: FormType[] = [
    {"name":"reportType","type":"select","label":"Select Report type","required":true}
]


export const basicFormArray:FormType[] = [
    {"name":"phoneNumber","type":"text","label":"Phone Number","required":true},
    {"name":"diagnosticName","type":"text","label":"Diagnostic Name","required":true},
    {"name":"email","type":"email","label":"Email","required":true,pattern:emailPattern},
    {"name":"managerName","type":"text","label":"Manager Name","required":true}
]
  
export const brandDetailsFormArray:FormType[] = [
    {"name":"brandLogo","type":"image","label":"Brand Logo","required":false},
    // {"name":"brandBanner","type":"image","label":"Brand Banner","required":false,pattern:""},
    {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true,pattern:/.*facebook\.com.*/},
    {"name":"instaUrl","type":"text","label":"Instagram Url","required":true,pattern:/.*instagram\.com.*/},
]
  
export const branchDetailsFormArray: FormType[] = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"branchContact","type":"text","label":"Branch Contact","required":true,pattern:phonePattern},
    {"name":"branchEmail","type":"email","label":"Branch Email","required":true},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
   
]

export const branchDetailsEditFormArray: FormType[] = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"branchContact","type":"contact","label":"Branch Contact","required":true,pattern:phonePattern},
    {"name":"branchEmail","type":"email","label":"Branch Email","required":true},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
    {"name":"branchOperator","type":"multiSelect","label":"Branch Operator","required":true},
]

export const testForm:FormType = [
    {"name":"keyword","type":"text","label":"Parameters","required":true,pattern: textPattern},
    {"name":"unit","type":"text","label":"unit","required":true,pattern:textPattern},
    {"name":"minRange","type":"text","label":"minRange","required":true,pattern:numberPattern},
    {"name":"maxRange","type":"text","label":"minRange","required":true,pattern:numberPattern},
    {"name":"aliases","type":"tags","label":"Aliases","required":true},
  ]

export const pathologistFormArray = [
    {"name":"signature","type":"image","label":"Pathologist Signature","required":true},
    {"name":"name","type":"text","label":"Pathologist Name","required":true},
    {"name":"designation","type":"text","label":"Pathologist Designation","required":true},
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

export interface FormProps  {
  name:string,
  type:string,
  label:string,
  required:boolean,
  pattern:RegExp,
}

export interface DynamicFormType  {
  formProps: FormProps[],
  buttonText: string,
  selectedValue?:any,
  formStyle?:string,
  button?:boolean,
  initial?:any,
  showLabel?:Boolean,
  reportsValidation?:Boolean,
  disableElement?:Boolean,
  setSelectedValue?: (value:any) =>void
  handleSubmit: (value:any) =>void
  handleImage?: (value:any) =>void
  handleDate?: (value:any) => void
}

export const EmployeeDetails:FormType[] = [
    {"name":"managerName","type":"text","label":"Operator Name","required":true},
    {"name":"managerContact","type":"text","label":"Operator Contact","required":true,pattern:phonePattern},
    {"name":"managerRole","type":"select","label":"Operator Role","required":true}
  ]