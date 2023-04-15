import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { send } from 'micro';
import connectDB from 'utils/mongoDb/middleware';
import DiagnosticEmployeesTable from 'utils/mongoDb/model/diagnosticEmployee';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Content-Security-Policy', 'unsafe-url');
    try {
      const {phoneNumber} = req.query;
      let users = await DiagnosticEmployeesTable.findOne({"managerContact":'+'+phoneNumber?.toString()?.replace(" ","")});
      //@ts-ignore
      return res.status(200).json(users);
    } catch (error) {
        send(res, 500, 'API is down');
    }
};

export default connectDB(handler);
