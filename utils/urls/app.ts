// export const backendApi= "https://parser-api.onrender.com"
export const backendApiPath = "http://localhost:4000"


// Api paths for backend calls
export const getDiagnosticUserApi = backendApiPath+`/api/diagnostic/getDiagnosticUser?userId=`
export const insertDiagnosticUserApi = backendApiPath+`/api/diagnostic/saveDiagnosticUser`
export const uploadImageApi = backendApiPath+`/api/diagnostic/uploadBranding`
export const getDiagnosticReports = backendApiPath+`/api/diagnostic/reports/getDiagnosticReports?userId=`