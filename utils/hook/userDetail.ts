import { getDiagnosticUserApi } from "utils/urls/app";
import { getUserDetailType } from "utils/types/atoms/hooks";


export async function getUserDetails(userId: getUserDetailType) {
  return fetch(getDiagnosticUserApi+userId.phoneNumber, {}).then(res => res.json())
}

