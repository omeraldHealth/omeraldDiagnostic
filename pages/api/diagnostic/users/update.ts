import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'utils/mongoDb/middleware';
import DiagnosticProfileTable from 'utils/mongoDb/model/diagnosticProfile';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
    const diagnosticUserObject = req.body;
    const {phoneNumber} = req.query
      try{
        //@ts-ignore
        const userData = await DiagnosticProfileTable.updateOne({"phoneNumber":'+'+phoneNumber.replace(" ","")},diagnosticUserObject);
        return res.status(201).json(userData);
      }
      catch(err){
        return res.status(500).json(err);
      }
};

export default connectDB(handler);