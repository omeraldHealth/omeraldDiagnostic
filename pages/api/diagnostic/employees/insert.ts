import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'utils/mongoDb/middleware';
import DiagnosticEmployeesTable from 'utils/mongoDb/model/diagnosticEmployee';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Content-Security-Policy', 'unsafe-url');
     const diagnosticUserObject = req.body;
      try{
        //@ts-ignore
        const userData = await DiagnosticEmployeesTable.insertMany(diagnosticUserObject);
        return res.status(201).json(userData);
      }
      catch(err){
        return res.status(500).json(err);
      }
};

export default connectDB(handler);