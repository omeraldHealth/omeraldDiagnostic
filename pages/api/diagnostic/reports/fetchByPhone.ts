import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { send } from 'micro';
import connectDB from 'utils/mongoDb/middleware';
import DiagnosticReportsTable from 'utils/mongoDb/model/diagnosticReport';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
    try {
      const {phoneNumber} = req.query;
      let users = await DiagnosticReportsTable.find({"phoneNumber":'+'+phoneNumber?.toString()?.replace(" ","")});
      //@ts-ignore
      return res.status(200).json(users);
    } catch (error) {
        send(res, 500, 'API is down');
    }
};

export default connectDB(handler);
