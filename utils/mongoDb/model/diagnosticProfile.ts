import mongoose from "mongoose";
var Schema = mongoose.Schema;

const BrandDetailsForm = {
    brandLogo: String,
    facebookUrl: String,
    instaUrl: String
};

const IManagerDetails = {
    managerName:  {type:String},
    managerRole:  {type:String},
    managerContact:  {type:String},
    branchId: {type:String},
};

const ActivityDetails = {
    activity: {type:String},
    user: IManagerDetails,
    updatedTime: {type: Date,default: Date.now},
    branchId: {type:String},
};

const BranchDetail = {
    branchName:  {type:String},
    branchEmail:  {type:String},
    branchAddress:  {type:String},
    branchContact: {type:String},
    branchOperator: {type:[String]},
}

const IPathologistDetails = {
    name: {type:String},
    designation: {type:String},
    signature: {type:String},
    branchId: {type:String},
}

const ReportParamsType = { keyword: {type:String},
    aliases:  {type:[String]},
    minRange:  {type:String},
    maxRange:  {type:String},
    unit:  {type:String},
};

const SampleTypes = {
    testName:{type:String,required:true},
    keywords: {type:[ReportParamsType]}
};

const ReportType = {
  sampleName: {type:String,required:true},
  sampleType: {type:SampleTypes,required:true},
  branchId: {type:String,required:true},
}

const DiagnosticUserSchema = new Schema({
    diagnosticName: {type:String,required:true},
    fullName: {type:String},
    tests: {type:[ReportType]},
    phoneNumber: {type:String,required:true,unique:true},
    branch: {type:String},
    email: {type:String,required:true},
    sharedReport: {type:[String]},
    address: {type:String},
    reports: {type:[String]},
    updatedAt: {type: Date,default: Date.now},
    brandDetails: BrandDetailsForm,
    managersDetail: [IManagerDetails],
    activities: [ActivityDetails],
    branchDetails: [BranchDetail],
    pathologistDetail: [IPathologistDetails],
});

//@ts-ignore
mongoose.models = {};

var DiagnosticProfileTable = mongoose.model("diagnostic-profiles", DiagnosticUserSchema);

export default DiagnosticProfileTable;
