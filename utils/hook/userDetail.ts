import { addQueryApi, getDiagnosticReports, getDiagnosticUserApi, getQueriesApi, insertDiagnosticUserApi, insertReportApi, updateDiagnosticUserApi, updateTestApi, uploadImageApi, uploadReportApi } from "utils/urls/app";
import { getUserDetailType } from "utils/types/atoms/hooks";
import axios from "axios";
import { ReportDetails, UserDetails } from "utils/types/molecules/users.interface";
import { Query } from "utils/types/atoms/atoms";

export async function getUserDetails(userId: getUserDetailType) {
  try {
    const resp = await axios.get(getDiagnosticUserApi+userId.phoneNumber, {});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error?.response?.status || error?.request?.code, data: null };
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file',file);
    try {
    const resp = await axios.post(uploadImageApi, formData)
    const {location} = resp.data
    return location;
  } catch (error: any) {
    return null;
  }
}

export async function setUserDetails(userDetails: UserDetails) {
  try {
    const resp = await axios.post(insertDiagnosticUserApi, userDetails, {})
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error };
  }
}

export async function updateUserDetails(userId: getUserDetailType,data:any) {
  try {
    const resp = await axios.post(updateDiagnosticUserApi+userId.phoneNumber, data, {})
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error };
  }
}

export async function getReports(userId: getUserDetailType) {
  try {
    const resp = await axios.get(getDiagnosticReports+userId.phoneNumber,{});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}

export async function getQueries(
  userId: getUserDetailType
) {
  try {
    const resp = await axios.get(getQueriesApi+userId.phoneNumber,{
    });
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response};
  }
}

export async function addQuery(
  contactData: Query
) {
  try {
    const resp = await axios.post(addQueryApi,contactData,{});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response};
  }
}

export async function uploadReport(
  file: File,
) {
  const formData = new FormData();
  formData.append('file',file);
    try {
      const resp = await axios.post(uploadReportApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return resp;
  } catch (error: any) {
    return null;
  }
}

export async function createReport(
  userId: string,
  reportDetails: ReportDetails
) {
  try {
    reportDetails.userId = userId.split(" ").join("");
    const resp = await axios.post(
      insertReportApi,
      reportDetails,
    );
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response };
  }
}

export async function updateTests(
  tests: any,userId: any
) {
  try {
    const resp = await axios.post(updateTestApi+`${userId}`, tests,{
      // headers: { Authorization: `Bearer ${token}` },
    });
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response};
  }
}