// export const backendApiPath= "https://parser-api.onrender.com"
export const backendApiPath = "http://localhost:3000"

//Api paths for backend calls
export const getDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/fetchByPhone?phoneNumber=`
export const insertDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/add`
export const updateDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/update?phoneNumber=`

export const uploadImageApi = backendApiPath+`/api/diagnostic/s3bucket/addBrandingImages`

export const getDiagnosticReports = backendApiPath+`/api/diagnostic/reports/fetchByPhone?phoneNumber=`
export const insertReportApi = backendApiPath+`/api/diagnostic/reports/add`

export const uploadReportApi = backendApiPath+`/api/diagnostic/s3bucket/addReportFiles`

export const getEmployees = backendApiPath+`/api/diagnostic/employees/fetchAll`
export const getEmployeeById = backendApiPath+`/api/diagnostic/employees/fetchByPhone?phoneNumber=`
export const insertEmployee = backendApiPath+`/api/diagnostic/employees/add`
export const updateEmployee = backendApiPath+`/api/diagnostic/employees/update?userId=`
export const deleteEmployee = backendApiPath+`/api/diagnostic/employees/delete?phoneNumber=`