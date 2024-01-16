import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import os from "os";

export async function downloadFromS3() {
  const file_key = "Envision Connect 2 Client Guide v1.2.pdf";
  try {
    const s3Client = new S3Client({
      region: "us-west-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file_key,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const file_name = `${os.tmpdir()}/pdf-${Date.now()}.pdf`; // use os.tmpdir() to get the temp directory

    const writeStream = fs.createWriteStream(file_name);
    response.Body.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => resolve(file_name));
      writeStream.on("error", reject);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
