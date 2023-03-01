export const GET_DIAGNOSTIC_DETAILS = 'GET_DIAGNOSTIC_DETAILS';
export const SET_DIAGNOSTIC_DETAILS = 'SET_DIAGNOSTIC_DETAILS';
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
    {"name":"brandLogo","type":"logo","label":"Brand Logo","required":true},
    {"name":"brandBanner","type":"banner","label":"Brand Banner","required":false},
    {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true},
    {"name":"instaUrl","type":"text","label":"Instagram Url","required":true}
]
  
export const branchDetailsFormArray = [
    {"name":"branchName","type":"text","label":"Branch Name","required":true},
    {"name":"branchEmail","type":"text","label":"Branch Email","required":false},
    {"name":"branchAddress","type":"text","label":"Branch Address","required":true},
    {"name":"branchContact","type":"text","label":"Branch Contact","required":true},
]
