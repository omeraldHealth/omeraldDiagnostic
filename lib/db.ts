import axios, { AxiosError } from "axios";
import { UserDetails } from "middleware/models.interface";

export async function testWorking(token: string) {
  const resp = await axios.get(`/api/testing`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp;
}
export async function getUserDetails(token: string, userId: string) {
  try {
    const resp = await axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (error: AxiosError) {
    return error.response;
  }
}
export async function setUserDetails(token: string, userDetails: UserDetails) {
  try {
    const resp = await axios.post(
      `/api/user/${userDetails.phoneNumber}`,
      userDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error: AxiosError) {
    return error.response;
  }
}
export async function getReportTypes(token: string) {
  try {
    const resp = await axios.get(`/api/reportTypes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (error) {
    return error.resp;
  }
}
