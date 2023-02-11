import { withAuth } from "@/lib/middlewares";
import { time } from "console";
import { connectToDatabase } from "middleware/database";
import { NextApiRequest, NextApiResponse } from "next";
import { DiagnosticCenter } from "../../../middleware/models.interface";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const user = await db
        .collection("diagnosticusers")
        .findOne({ phoneNumber: userId });

      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).send("Not Found");
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const userDetails = req.body as DiagnosticCenter;
      userDetails.updatedAt = new Date();
      const isUserExists = await db
        .collection("diagnosticusers")
        .findOne({ phoneNumber: userDetails.phoneNumber });

      if (isUserExists == null) {
        const user = await db
          .collection("diagnosticusers")
          .insertOne({ ...userDetails });

        return res.status(201).json({ user });
      } else {
        return res.status(409).send("User already exists");
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(400).end("method not allowed");
};

export default withAuth(handler);
