import axios, { AxiosError } from "axios";
import { ReportDetails, DiagnosticCenter } from "middleware/models.interface";
import { generateUploadURL } from "./s3";

export async function getUserDetails(token: string, userId: string) {
  try {
    const resp = await axios.get(`/api/user/${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}








export async function setUserDetails(token: string, userDetails: DiagnosticCenter) {
  try {
    const resp = await axios.post(
      `/api/user/${encodeURIComponent(userDetails.phoneNumber)}`,
      userDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
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
export async function uploadImage(file: File) {
  try {
    // console.log(file);
    // const imageData = Buffer.from(file, "base64");
    const { data } = await axios.get(`/api/getUploadLink`);
    console.log(data.url)
    const resp = await axios.put(data.url, file, {
      headers: { 
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*'
      }
    });
    const imageUrl = data.url.split("?")[0];
    // console.log(imageUrl);
    return imageUrl;
  } catch (error: any) {
    // console.log(error);
    return null;
  }
}
