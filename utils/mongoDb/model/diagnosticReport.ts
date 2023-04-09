import mongoose from "mongoose";
var Schema = mongoose.Schema;

const ReportParamsType = {
    keyword: {type:String},
    aliases:  {type:[String]},
    normalRange:  {type:String},
    unit:  {type:String},
};

const DiagnosticReportSchema = new Schema({
    userId: {type:String,required:true},
    userName: {type:String,required:true},
    email: {type:String,required:true},
    gender: {type:String,required:true},
    dob: {type: Date},
    doctorName: {type:String},
    reportId: {type:String},
    reportUrl: {type:String},
    reportDate: {type: Date,required:true},
    status: {type: String,default :"parsing"},
    testName: {type:String},
    isManualReport: {type:Boolean},
    parsedData:{type:[ReportParamsType]},
    branchId:  {type:String},
    createdAt: {
        type: Date,
        default: Date.now
      },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

//@ts-ignore
mongoose.models = {};

var DiagnosticReportsTable = mongoose.model("diagnostic-reports", DiagnosticReportSchema);

export default DiagnosticReportsTable;
