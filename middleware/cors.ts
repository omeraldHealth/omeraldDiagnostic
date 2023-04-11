import { NextApiRequest, NextApiResponse } from 'next';

export default function cors(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUSH,');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}
