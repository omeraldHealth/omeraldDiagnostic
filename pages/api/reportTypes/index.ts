import { withAuth } from "@/lib/middlewares";
import { connectToDatabase } from "middleware/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase();
  if (req.method === "GET") {
    try {
      const reportTypes = await db.collection("tests").find().toArray();
      // .collection("tests")
      // .findOne({ testName: "Blood Report" });
      // console.log(reportTypes);
      return res.status(200).json({ reportTypes });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
    } catch (error: any) {
      //   res.status(500).json({ error: error.message });
    }
  }

  res.status(400).end("method not allowed");
};

export default withAuth(handler);
