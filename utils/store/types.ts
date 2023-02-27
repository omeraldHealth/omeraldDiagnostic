export const GET_DIAGNOSTIC_DETAILS = 'GET_DIAGNOSTIC_DETAILS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export type LoginReducer = {isLoggedIn: false, user: null, error: null}
export type rootReducerType = {"loginReducer":LoginReducer}