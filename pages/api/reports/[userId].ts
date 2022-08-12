import { withAuth } from "@/lib/middlewares";
import { connectToDatabase } from "middleware/database";
import { ReportDetails } from "middleware/models.interface";
import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { client, db } = await connectToDatabase();
  const session = client.startSession();
  const { userId } = req.query;
  if (req.method === "GET") {
    try {
      console.log(userId);
      const user = await db
        .collection("diagnosticusers")
        .findOne({ phoneNumber: userId });
      console.log(user);
      if (user.reports) {
        const reportsList = await db
          .collection("reports")
          .find({ reportId: { $in: user.reports } })
          .toArray();
        console.log(reportsList);

        return res.status(200).json(reportsList);
      } else {
        return res.status(404).send("No Reports Found");
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    const reportDetails = req.body as ReportDetails;

    try {
      let report;
      let addReportId;
      await session.withTransaction(async () => {
        reportDetails.reportId = randomUUID();
        // reportDetails.createdAt = new Date(); because createdAt timestamp can be retrived be ObjectId("sdfdf").getTimestamp()
        reportDetails.updatedAt = new Date();
        report = await db.collection("reports").insertOne(reportDetails);

        const filter = { phoneNumber: userId };
        const options = { upsert: true };
        const updateDoc = {
          $push: {
            reports: reportDetails.reportId,
          },
        };

        addReportId = await db
          .collection("diagnosticusers")
          .updateOne(filter, updateDoc, options);
      });

      return res.status(201).json({ report, addReportId });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    } finally {
      await session.endSession();
      await client.close();
    }
  }

  res.status(400).end("method not allowed");
};

export default withAuth(handler);
