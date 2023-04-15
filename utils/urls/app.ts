// export const backendApiPath= "https://parser-api.onrender.com"
export const backendApiPath = "http://localhost:3000"

//Api paths for backend calls
export const getDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/fetchByPhone?phoneNumber=`
export const insertDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/insert`
export const updateDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/update?phoneNumber=`

// export const uploadImageApi = backendApiPath+`/api/diagnostic/s3bucket/addBrandingImages`
export const uploadImageApi = "https://parser-api.onrender.com/api/diagnostic/uploadBranding"

export const getDiagnosticReports = backendApiPath+`/api/diagnostic/reports/fetchByPhone?phoneNumber=`
export const insertReportApi = backendApiPath+`/api/diagnostic/reports/insert`

export const uploadReportApi = "https://parser-api.onrender.com/api/diagnostic/uploadReport"  

export const getEmployees = backendApiPath+`/api/diagnostic/employees/fetchAll`
export const getEmployeeById = backendApiPath+`/api/diagnostic/employees/fetchByPhone?phoneNumber=`
export const insertEmployee = backendApiPath+`/api/diagnostic/employees/insert`
export const updateEmployee = backendApiPath+`/api/diagnostic/employees/update?userId=`
export const deleteEmployee = backendApiPath+`/api/diagnostic/employees/delete?id=`

// Omerald admin report types

export const getReportTypesApi = "https://admin-omerald-dev.vercel.app/api/reports"
export const getDiagnosticSetting = "https://admin-omerald-dev.vercel.app/api/settings/diagnostic/"


// // export const backendApiPath= "https://parser-api.onrender.com"
// // export const backendApiPath = "http://localhost:3000"
// // export const backendApiPath = "https://diagnostic-omerald-dev.vercel.app"
// export const backendApiPath = "";
// //Api paths for backend calls
// export const getDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/fetchByPhone?phoneNumber=`
// export const insertDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/insert`
// export const updateDiagnosticUserApi = backendApiPath+`/api/diagnostic/users/update?phoneNumber=`

// // export const uploadImageApi = backendApiPath+`/api/diagnostic/s3bucket/addBrandingImages`
// export const uploadImageApi = "https://parser-api.onrender.com/api/diagnostic/uploadBranding"

// export const getDiagnosticReports = backendApiPath+`/api/diagnostic/reports/fetchByPhone?phoneNumber=`
// export const insertReportApi = backendApiPath+`/api/diagnostic/reports/insert`

// export const uploadReportApi = "https://parser-api.onrender.com/api/diagnostic/uploadReport"  

// export const getEmployees = backendApiPath+`/api/diagnostic/employees/fetchAll`
// export const getEmployeeById = backendApiPath+`/api/diagnostic/employees/fetchByPhone?phoneNumber=`
// export const insertEmployee = backendApiPath+`/api/diagnostic/employees/insert`
// export const updateEmployee = backendApiPath+`/api/diagnostic/employees/update?userId=`
// export const deleteEmployee = backendApiPath+`/api/diagnostic/employees/delete?phoneNumber=`

// // Omerald admin report types

// export const getReportTypesApi = "https://admin-omerald-dev.vercel.app/api/reports"