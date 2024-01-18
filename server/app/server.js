import express from "express";
import s3DownloadRouter from "./routes/s3Download.js";
import aiRouter from "./routes/ai.js";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import dbRouter from "./routes/db.js";
// Load environment variables based on the NODE_ENV
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config(); // This will automatically load variables from .env for development
}
const app = express();
const port = 8080;
app.use(cors());
app.use(helmet());
app.use(express.json()); // for parsing application/json

app.use("/api/s3", s3DownloadRouter); // use the router as middleware
app.use("/api/ai", aiRouter);
app.use("/api/db", dbRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
