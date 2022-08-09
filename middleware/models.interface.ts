import { ObjectId } from "mongodb";

export interface UserDetails {
  diagnosticName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address?: string;
  reports?: string[];
}
export interface UserSession {
  userId: string;
  token: string;
}
