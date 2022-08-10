import axios, { AxiosError } from "axios";
import { ReportDetails, UserDetails } from "middleware/models.interface";

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
export async function setUserDetails(token: string, userDetails: UserDetails) {
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
