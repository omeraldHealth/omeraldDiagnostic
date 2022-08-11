import { ObjectId, Timestamp } from "mongodb";

export interface UserDetails {
  diagnosticName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address?: string;
  reports?: string[];
  updatedAt?: Date;
}
export interface UserSession {
  userId: string;
  token: string;
}
export type ReportTypes = {
  _id: ObjectId;
  testName: string;
  keywords: ReportParamsType[];
};
export type ReportParamsType = {
  _id: ObjectId;
  keyword: string;
  aliases: string[];
  normalRange: string;
  unit: string;
};
export type ReportParamsData = Pick<
  ReportParamsType,
  "keyword" | "unit" | "normalRange"
> & { value: string };

export type ReportDetails = {
  userId: string;
  fullName: string;
  email: string;
  reportId?: string;
  reportUrl: string;
  bookingDate: Date;
  status: "parsed" | "parsing";
  testName: string;
  parsedData: ReportParamsData[];
  createdAt?: Date;
  updatedAt?: Date;
};
