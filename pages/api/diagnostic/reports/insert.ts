import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'utils/mongoDb/middleware';
import DiagnosticReportsTable from 'utils/mongoDb/model/diagnosticReport';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Content-Security-Policy', 'unsafe-url');
     const diagnosticUserObject = req.body;
      try{
        //@ts-ignore
        const userData = await DiagnosticReportsTable.insertMany(diagnosticUserObject);
        return res.status(201).json(userData);
      }
      catch(err){
        return res.status(500).json(err);
      }
};

export default connectDB(handler);