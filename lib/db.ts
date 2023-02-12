import axios, { AxiosError } from "axios";
import { ReportDetails, UserDetails } from "middleware/models.interface";
import { generateUploadURL } from "./s3";

const url = "http://localhost:4000"

export async function getUserDetails(token: string, userId: string) {
  try {
    const resp = await axios.get(url+`/api/diagnostic/getDiagnosticUser?userId=`+userId, {});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file',file);
    try {
      const resp = await axios.post(url+`/api/diagnostic/uploadBranding`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    const {location} = resp.data
    return location;
  } catch (error: any) {
    return null;
  }
}

export async function setUserDetails(token: string, userDetails: UserDetails) {
  try {
    const resp = await axios.post(url+`/api/diagnostic/saveDiagnosticUser`, userDetails, {})
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error };
  }
}

export async function getReportTypes(token: string) {
  try {
    const resp = await axios.get(`/api/reportTypes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
export async function setSession(token: string, userId: string) {
  try {
    const resp = await axios.post(
      `/api/session/${encodeURIComponent(userId)}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
export async function deleteSession(token: string, userId: string) {
  try {
    const resp = await axios.delete(
      `/api/session/${encodeURIComponent(userId)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
export async function createReport(
  token: string,
  userId: string,
  reportDetails: ReportDetails
) {
  try {
    reportDetails.userId = reportDetails.userId.split(" ").join("");
    const resp = await axios.post(
      `/api/reports/${encodeURIComponent(userId)}`,
      reportDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
export async function getReports(token: string, userId: string) {
  try {
    const resp = await axios.get(`/api/reports/${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
export async function uploadReport(
  token: string,
  userId: string,
  file: string | number | readonly string[],
  testName: string
) {
  try {
    const resp = await axios.post(
      `https://calm-tor-77784.herokuapp.com/uploadReport`,
      {
        file: file,
        userId: userId,
        token: token,
        testName: testName,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
