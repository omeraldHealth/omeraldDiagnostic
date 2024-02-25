// Base URL for the backend API
export const backendApiPath = "https://backend.omerald.com/diagStage/";

// API paths for diagnostic profiles
export const getDiagProfileByPhoneApi = backendApiPath + `profiles/getProfile/`; // Endpoint to get diagnostic profile by phone
export const createDiagProfileApi = backendApiPath + `profiles/createProfile/`; // Endpoint to create diagnostic profile
export const updateDiagProfileApi = backendApiPath + `profiles/updateProfile`; // Endpoint to update diagnostic profile

// API paths for diagnostic reports
export const getDiagReportsApi = backendApiPath + `reports/getReports/`; // Endpoint to get diagnostic reports
export const createDiagReportsApi = backendApiPath + `reports/createReport/`; // Endpoint to create diagnostic report
export const deleteDiagReportsApi = backendApiPath + `reports/deleteReport/`; // Endpoint to create diagnostic report


export const uploadDiagnosticReportApi = backendApiPath + `s3/reports/upload`; // Endpoint to upload diagnostic report
export const uploadDiagnosticLogoApi = backendApiPath + `s3/omerald/upload`; // Endpoint to upload diagnostic logo

// External API path to get all admin report types
export const getAdminReportTypesApi = "https://backend.omerald.com/adminStage";

// Comments added to explain the purpose of each API endpoint
