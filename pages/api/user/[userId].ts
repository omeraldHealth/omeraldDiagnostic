import { withAuth } from "@/lib/middlewares";
import { connectToDatabase } from "middleware/database";
import { NextApiRequest, NextApiResponse } from "next";
import { UserDetails } from "../../../middleware/models.interface";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase();
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const user = await db
        .collection("diagnosticusers")
        .findOne({ phoneNumber: userId });

      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const userDetails = req.body as UserDetails;

      const isUserExists = await db
        .collection("diagnosticusers")
        .findOne({ phoneNumber: userDetails.phoneNumber });

      if (isUserExists == null) {
        const user = await db
          .collection("diagnosticusers")
          .insertOne({ ...userDetails });

        return res.status(201).json(user);
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
