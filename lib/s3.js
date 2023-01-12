import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

const region = "ap-south-1";
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});
export async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 120,
    // Valid Values: MIME types
    // ContentEncoding: "base64",
  };
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  // console.log(uploadURL);
  return uploadURL;
}
