import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { send } from 'micro';
import DiagnosticProfileTable from 'utils/mongoDb/model/diagnosticProfile';
import connectDB from 'utils/mongoDb/middleware';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Content-Security-Policy', 'unsafe-url');
    try {
      const {phoneNumber} = req.query;
      let users = await DiagnosticProfileTable.findOne({"phoneNumber":'+'+phoneNumber?.toString()?.replace(" ","")});
      //@ts-ignore
      return res.status(200).json(users);
    } catch (error) {
        send(res, 500, 'API is down');
    }
};

export default connectDB(handler);
