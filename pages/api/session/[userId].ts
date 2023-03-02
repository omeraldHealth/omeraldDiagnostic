
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/middleware/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase();
  const { userId } = req.query;
  if (req.method === "POST") {
    try {
      const filter = { userId: userId };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          token: req.headers.authorization,
          updatedAt: new Date(),
        },
      };
      const session = await db
        .collection("diagnosticUserSessions")
        .updateOne(filter, updateDoc, options);

      return res.status(200).json({ session });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const session = await db
        .collection("diagnosticUserSessions")
        .deleteOne({ userId: userId });
      return res.status(200).json({ session });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(400).end("method not allowed");
};

export default handler;
