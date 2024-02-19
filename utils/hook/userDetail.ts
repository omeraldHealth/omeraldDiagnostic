import {createDiagProfileApi, getDiagProfileByPhoneApi, updateDiagProfileApi } from "utils/urls/app";
import { getUserDetailType } from "utils/types/atoms/hooks";
import { ReportDetails, UserDetails } from "utils/types/molecules/users.interface";
import axios from "axios";

//fetch diagnostic profile
export async function getUserDetails(phoneNumber: getUserDetailType) {
  try {
  const resp = await axios.get(getDiagProfileByPhoneApi+phoneNumber.phoneNumber,{});
  return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error?.response?.status || error?.request?.code, data: null };
  }
}

//insert diagnostic profile
export async function setUserDetails(userDetails: UserDetails) {
  try {
    const resp = await axios.post(createDiagProfileApi, userDetails, {})
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error };
  }
}
//update diagnostic profile
export async function updateUserDetails(data:any) {
  try {
    const resp = await axios.post(updateDiagProfileApi, {data:data, id: data?._id})
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error };
  }
}
//upload image to s3
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
//upload report to s3
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
//fetch diagnostic reports
export async function getReports(userId: getUserDetailType) {
  try {
    const resp = await axios.get(getDiagnosticReports+userId.phoneNumber,{});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}
//insert diagnostic reports
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
//send whatsapp text
export async function sendWhatsAppText(
  data: any
) {
  try {
    const resp = await axios.post(sendWhatsAppApi,data);
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response};
  }
}
