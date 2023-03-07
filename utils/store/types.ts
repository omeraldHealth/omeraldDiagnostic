export const GET_DIAGNOSTIC_DETAILS = 'GET_DIAGNOSTIC_DETAILS';
export const SET_DIAGNOSTIC_DETAILS = 'SET_DIAGNOSTIC_DETAILS';
export const GET_DASHBOARD_ROUTE = 'GET_DASHBOARD_ROUTE';
export const SET_DASHBOARD_ROUTE = 'SET_DASHBOARD_ROUTE';
export const SET_REPORT = 'SET_REPORT'
export const GET_REPORT = 'GET_REPORT'
export const SET_REPORT_LIST = 'SET_REPORT_LIST'
export const GET_REPORT_LIST = 'GET_REPORT_LIST'
export const SET_TEST = 'SET_TEST'
export const GET_TEST = 'GET_TEST'
export const GET_REPORT_FORM = 'GET_REPORT_FORM'
export const SET_REPORT_FORM = 'SET_REPORT_FORM'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export type LoginReducer = {isLoggedIn: false, user: null, error: null}
export type rootReducerType = {"loginReducer":LoginReducer}

export const basicFormArray = [
    {"name":"diagnosticName","type":"text","label":"Diagnostic Name","required":true},
    {"name":"email","type":"text","label":"Email","required":true},
    {"name":"phoneNumber","type":"text","label":"Phone Number","required":true}
]
  
export const brandDetailsFormArray = [
    {"name":"brandLogo","type":"logo","label":"Brand Logo","required":true,pattern:""},
    {"name":"brandBanner","type":"banner","label":"Brand Banner","required":false,pattern:""},
    {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true,pattern:"/.*facebook\.com.*/"},
    {"name":"instaUrl","type":"text","label":"Instagram Url","required":true,pattern:"/.*instagram\.com.*/"},
]
  
export const branchDetailsFormArray = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"managerName","type":"text","label":"Manager Name","required":true,pattern:""},
    {"name":"branchEmail","type":"email","label":"Branch Email","required":false,pattern:""},
    {"name":"managerContact","type":"text","label":"Manager Contact","required":true,pattern:""},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
    {"name":"managerRole","type":"roles","label":"Manager Role","required":true,pattern:""},
    {"name":"branchContact","type":"text","label":"Branch Contact","required":true},
  
]

export interface ReportTableType {
    key: React.Key;
    userName: string;
    email: number;
    testName: string;
    reportDate: Date;
    status: string;
  }