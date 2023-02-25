import { getDiagnosticUserApi } from "utils/urls/app";
import axios from "axios";
import { getUserDetailType } from "utils/types/atoms/hooks";

export async function getUserDetails(userId: getUserDetailType) {
  try {
    const resp = await axios .get(getDiagnosticUserApi+userId, {});
    return { status: resp.status, data: resp.data };
  } catch (error: any) {
    return { status: error.response.status || error.request.code, data: null };
  }
}