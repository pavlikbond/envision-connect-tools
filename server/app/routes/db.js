import express from "express";
import { connectDb } from "../utils/utils.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  const client = connectDb();

  try {
    await client.connect();
    //run a query to get the number of rows in a table called embeddings
    const result = await client.query("SELECT COUNT(*) FROM embeddings");
    console.log(result.rows[0].count);
  } catch (error) {
    console.error("connection error", error);

    return res.send("connection error");
  }

  await client.end();
  return res.send("Hello World!");
});

export default router;
