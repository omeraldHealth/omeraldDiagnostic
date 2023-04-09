import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'utils/mongoDb/middleware';
import DiagnosticEmployeesTable from 'utils/mongoDb/model/diagnosticEmployee';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
    const diagnosticUserObject = req.body;
    const {phoneNumber} = req.query
      try{
        //@ts-ignore
        const userData = await DiagnosticEmployeesTable.deleteOne({"managerContact":'+'+phoneNumber.replace(" ","")},diagnosticUserObject);
        return res.status(201).json(userData);
      }
      catch(err){
        return res.status(500).json(err);
      }
};

export default connectDB(handler);