import { withAuth } from "@/lib/middlewares";
import { connectToDatabase } from "middleware/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase();
  const { userId } = req.query;
  if (req.method === "GET") {
    try {
      const filter = { userId: userId };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          token: req.headers.authorization,
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
    } catch (error: any) {
      //   res.status(500).json({ error: error.message });
    }
  }

  res.status(400).end("method not allowed");
};

export default withAuth(handler);
