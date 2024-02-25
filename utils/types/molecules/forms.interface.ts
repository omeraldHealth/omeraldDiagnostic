import { useProfileValue } from "@components/common/constants/recoilValues";
import path from "path";
import { uploadDiagnosticReportApi } from "utils/urls/app";
import { UploadFile } from "antd";

export const textPattern = /[^0-9]/

export const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const phonePattern = /^\+91[6789]\d{9}$/;
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
    options?: Object,
    handleImage?: (images: { logo: UploadFile[] }) => void;
    handleDate?: () => {},
    fileList?: any,
    handlePreview?: Function,
    uploadUrl?: string
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
  
export const brandDetailsFormArray = (handleImage: (images: { logo: UploadFile[] }) => void): FormType[] => {
    return [
        {"name":"brandLogo","type":"logo","label":"Brand Logo","required":true, handleImage:handleImage},
        {"name":"brandBanner","type":"image","label":"Brand Banner","required":false},
        {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true,pattern:/.*facebook\.com.*/},
        {"name":"instaUrl","type":"text","label":"Instagram Url","required":true,pattern:/.*instagram\.com.*/},
    ]
}
   
  
export const branchDetailsFormArray: FormType[] = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"branchContact","type":"text","label":"Branch Contact","required":true,pattern:phonePattern},
    {"name":"branchEmail","type":"email","label":"Branch Email","required":true, pattern: emailPattern},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},

]

export const branchDetailsEditFormArray: FormType[] = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"branchContact","type":"settingContact","label":"Branch Contact","required":true,pattern:phonePattern},
    {"name":"branchEmail","type":"email","label":"Branch Email","required":true},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
    {"name":"branchOperator","type":"multiSelect","label":"Branch Operator","required":true},
]

export const testForm: FormType[] = [
    {"name": "sampleName", "type": "text", "label": "Parameters", "required": true, pattern: textPattern},
    {"name": "testName", "type": "text", "label": "unit", "required": true, pattern: textPattern},
    // {"name": "keyword", "type": "text", "label": "Parameters", "required": true, pattern: textPattern},
    // {"name": "unit", "type": "text", "label": "unit", "required": true, pattern: textPattern},
    // {"name": "minRange", "type": "text", "label": "minRange", "required": true, pattern: numberPattern},
    // {"name": "maxRange", "type": "text", "label": "maxRange", "required": true, pattern: numberPattern},
    // {"name": "aliases", "type": "tags", "label": "Aliases", "required": true},
];

export const parameterForm: FormType[] = [
    {"name": "keyword", "type": "text", "label": "Parameters", "required": true, pattern: textPattern},
    {"name": "unit", "type": "text", "label": "unit", "required": true, pattern: textPattern},
    {"name": "minRange", "type": "text", "label": "minRange", "required": true, pattern: numberPattern},
    {"name": "maxRange", "type": "text", "label": "maxRange", "required": true, pattern: numberPattern},
    {"name": "aliases", "type": "tags", "label": "Aliases", "required": true}
]

export const pathologistFormArray = (handleImage:any): FormType[] => [
    {"name":"signature","type":"logo","label":"Pathologist Signature","required":true, handleImage:handleImage},
    {"name":"name","type":"text","label":"Pathologist Name","required":true,pattern: textPattern},
    {"name":"designation","type":"text","label":"Pathologist Designation","required":true,pattern: textPattern},
]

const roles = [
    {label:"Admin", value:"admin"},
    {label:"Lab Manager", value:"manager"},
    {label:"Operator", value:"operator"},
    {label:"Spoc", value:"Spoc"}
]

export const managerFormArray = [
    {"name":"managerName","type":"text","label":"Operator Name","required":true,pattern: textPattern,},
    {"name":"managerRole","type":"select","label":"Operator Role","required":true,options:roles},
    {"name":"managerContact","type":"text","label":"Operator Contact","required":true,pattern: textPattern},
]

export const customTestForm:FormType[] = [
    {"name":"sampleName","type":"text","label":"Enter Custom Sample Name","required":true},
    {"name":"testName","type":"text","label":"Enter Test Name","required":true},
]

export const templateTestForm:FormType[] = [
    {"name":"sampleName","type":"text","label":"Enter Custom Sample Name","required":true},
    {"name":"testName","type":"search","label":"Enter Test Name","required":true},
]


const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
]

export const patientDetailsForm = (profileValues:any): FormType[] => {

    const pathologistList = profileValues?.pathologistDetail?.map((path:any) => { return {"value":path.name}});

    return [
        {"name":"testName","type":"search","label":"Search Sample Type","required":true, pattern: textPattern},
        {"name":"userName","type":"text","label":"Enter Patient Name","required":true,pattern: textPattern},
        {"name":"userId","type":"contact","label":"Enter Patient Contact","required":true},
        {"name":"email","type":"email","label":"Patient Email","required":true,pattern: emailPattern},

        {"name":"dob","type":"date","label":"Date of Birth","required":false},
        {"name":"gender","type":"select","label":"Select Gender","required":true, options: genderOptions},
        {"name":"doctorName","type":"select","label":"Pathologist","required":false, options: pathologistList},
       
    ]
}



export const manualReportForm = (profileValues:any): FormType[] => {
    return [
        {"name":"userName","type":"text","label":"Enter Patient Name","required":true},
        {"name":"userId","type":"contact","label":"Enter Patient Contact","required":true},
        {"name":"email","type":"email","label":"Patient Email","required":true,pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
        {"name":"dob","type":"date","label":"Date of Birth","required":false},
        {"name":"gender","type":"select","label":"Select Gender","required":true, options: genderOptions},
    ]
}

export const reportUploadFormArray = (handleDate:any, handleUpload:any): FormType[] => {
    return [
        {"name":"reportId","type":"upload","label":"Upload Report","required":true, handleUpload: handleUpload},
        {"name":"reportDate","type":"date","label":"Report Created Date","required":true, handleDate: handleDate, uploadUrl:uploadDiagnosticReportApi},
    ]
}


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
  buttonText: string | undefined,
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
