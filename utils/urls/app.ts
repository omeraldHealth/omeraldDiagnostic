// export const backendApi= "https://parser-api.onrender.com"
export const backendApiPath = "http://localhost:4000"


// Api paths for backend calls
export const getDiagnosticUserApi = backendApiPath+`/api/diagnostic/getDiagnosticUser?userId=`
export const insertDiagnosticUserApi = backendApiPath+`/api/diagnostic/saveDiagnosticUser`
export const updateDiagnosticUserApi = backendApiPath+`/api/diagnostic/updateDiagnosticUser?userId=`
export const uploadImageApi = backendApiPath+`/api/diagnostic/uploadBranding`
export const getDiagnosticReports = backendApiPath+`/api/diagnostic/reports/getDiagnosticReports?userId=`
export const getQueriesApi = backendApiPath+`/api/diagnostic/getQuery?userId=`
export const addQueryApi = backendApiPath+`/api/diagnostic/createQuery`