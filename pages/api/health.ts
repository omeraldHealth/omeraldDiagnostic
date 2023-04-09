import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { send } from 'micro';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
    // Your health check logic goes here
    try {
        // Your health check logic goes here
        send(res, 200, 'API is running');
      } catch (error) {
        send(res, 500, 'API is down');
      }
};

export default handler;
