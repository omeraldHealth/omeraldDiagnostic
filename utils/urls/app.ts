// Base URL for the backend API
export const backendApiPath = "https://diagnostic-backend.onrender.com/";
// export const backendApiPath = "http://localhost:3002/";

// API paths for diagnostic profiles
export const getDiagProfileByPhoneApi = backendApiPath + `profiles/getProfile/`; // Endpoint to get diagnostic profile by phone
export const createDiagProfileApi = backendApiPath + `profiles/createProfile/`; // Endpoint to create diagnostic profile
export const updateDiagProfileApi = backendApiPath + `profiles/updateProfile`; // Endpoint to update diagnostic profile

// API paths for diagnostic reports
export const getDiagReportsApi = backendApiPath + `reports/getReports/`; // Endpoint to get diagnostic reports
export const createDiagReportsApi = backendApiPath + `reports/createReport/`; // Endpoint to create diagnostic report
export const deleteDiagReportsApi = backendApiPath + `reports/deleteReport/`; // Endpoint to create diagnostic report


export const uploadDiagnosticReportApi = backendApiPath + `s3/omerald/logoUpload`; // Endpoint to upload diagnostic report
export const uploadDiagnosticLogoApi = backendApiPath + `s3/diagnostic/reportUpload`; // Endpoint to upload diagnostic logo

// External API path to get all admin report types
export const getAdminReportTypesApi = "https://adminstage.azurewebsites.net/api/v1/reports/getAllReports";
export const getDiagnosticLandingData = "https://adminstage.azurewebsites.net/api/v1/diagnosticLanding/getDiagLanding";
export const getAdminApiGetToken = "https://adminstage.azurewebsites.net/api/v1/auth/getAuthToken"

