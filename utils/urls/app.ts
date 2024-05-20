// Base URL for the backend API
export const diagBackendApiPath = process.env.NEXT_PUBLIC_DIAG_BASE_API;
export const adminBackendApiPath = process.env.NEXT_PUBLIC_ADMIN_BASE_API;

// API paths for diagnostic profiles
export const getDiagProfileByPhoneApi = diagBackendApiPath + `profiles/getProfile/`; // Endpoint to get diagnostic profile by phone
export const createDiagProfileApi = diagBackendApiPath + `profiles/createProfile/`; // Endpoint to create diagnostic profile
export const updateDiagProfileApi = diagBackendApiPath + `profiles/updateProfile`; // Endpoint to update diagnostic profile

// API paths for diagnostic reports
export const getDiagReportsApi = diagBackendApiPath + `reports/getReports/`; // Endpoint to get diagnostic reports
export const createDiagReportsApi = diagBackendApiPath + `reports/createReport/`; // Endpoint to create diagnostic report
export const deleteDiagReportsApi = diagBackendApiPath + `reports/deleteReport/`; // Endpoint to create diagnostic report

export const uploadDiagnosticLogoApi = diagBackendApiPath + `s3/omerald/logoUpload`; // Endpoint to upload diagnostic report
export const uploadDiagnosticReportApi = diagBackendApiPath + `s3/diagnostic/reportUpload`; // Endpoint to upload diagnostic logo

// External API path to get all admin report types
export const getAdminReportTypesApi = adminBackendApiPath+"/api/v1/reports/getAllReports";
export const getDiagnosticLandingData = adminBackendApiPath+"/api/v1/diagnosticLanding/getDiagLanding"
export const getAdminApiGetToken = adminBackendApiPath+"/api/v1/auth/getAuthToken"
