import mongoose from "mongoose";
var Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  managerName: {type:String,required:true},
  managerRole: {type:String,required:true},
  managerContact:{type:String,required:true,unique:true},
  mainBranchId: {type:String,required:true},
  branchId:  {type:String},
})
//@ts-ignore
mongoose.models = {};

var DiagnosticEmployeesTable = mongoose.model("diagnostic-employee", EmployeeSchema);

export default DiagnosticEmployeesTable;
