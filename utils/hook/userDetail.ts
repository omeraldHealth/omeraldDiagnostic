import { getDiagnosticReports, getDiagnosticUserApi, insertDiagnosticUserApi, uploadImageApi } from "utils/urls/app";
import { getUserDetailType } from "utils/types/atoms/hooks";
import axios from "axios";
import { UserDetails } from "utils/types/molecules/users.interface";

export async function getUserDetails(userId: getUserDetailType) {
  try {
    const resp = await axios.get(getDiagnosticUserApi+userId.phoneNumber, {});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
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

export async function getReports(userId: getUserDetailType) {
  try {
    const resp = await axios.get(getDiagnosticReports+userId.phoneNumber,{});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}