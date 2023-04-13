import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { send } from 'micro';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<void>) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Content-Security-Policy', 'unsafe-url');

    // Your health check logic goes here
    try {
        // Your health check logic goes here
        send(res, 200, 'API is running');
    } catch (error) {
        send(res, 500, 'API is down');
    }
};

export default handler;
