export const backendApiPath = "http://localhost:3002/"

export const getDiagProfileByPhoneApi = backendApiPath+`profiles/getProfile/`
export const createDiagProfileApi = backendApiPath+`profiles/createProfile/`
export const updateDiagProfileApi = backendApiPath+`profiles/updateProfile`

export const getDiagReportsApi  =  backendApiPath+`reports/getReports/`
export const createDiagReportsApi  =  backendApiPath+`reports/createReport/`
export const uploadDiagnosticReportApi = backendApiPath+`s3/reports/upload`
export const uploadDiagnosticLogoApi = backendApiPath+`s3/omerald/upload`
export const getAdminReportTypesApi = "https://backend-wpvf.onrender.com/reports/getAllReports"