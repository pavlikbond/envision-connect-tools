import express from "express";
import { downloadFromS3 } from "../controllers/s3Controller.js"; // import the function from the controller
import { uploadToDb } from "../controllers/vectors.js";
const router = express.Router();

router.get("/download", async (req, res) => {
  const file_name = await downloadFromS3();
  //return the file name to the client in json with status of 200
  if (!file_name) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  await uploadToDb(file_name);
  res.status(200).json({ file_name });
});

export default router;
