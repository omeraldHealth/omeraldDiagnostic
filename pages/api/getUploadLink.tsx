import { generateUploadURL } from "@/lib/s3";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const url = await generateUploadURL();
      console.log(url);
      return res.status(200).send({ url });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(400).end("method not allowed");
};

export default handler;
