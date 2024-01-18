import pgvector from "pgvector/pg";
import { getEmbeddings } from "./embeddings.js";
import { removeExtraPeriods } from "../utils/utils.js";
import { connectDb } from "../utils/utils.js";

export async function getMatchesFromEmbeddings(embeddings) {
  const client = connectDb();
  await client.connect();
  let queryString = "SELECT text FROM embeddings ORDER BY vector <-> $1 LIMIT 5;";

  try {
    let result = await client.query(queryString, [pgvector.toSql(embeddings)]);
    return result.rows.map((row) => row.text) || [];
  } catch (error) {
    console.log("error getting matches from db", error);
  }
}

export async function getContext(query) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings);
  return removeExtraPeriods(matches.join("\n")).substring(0, 3000);
}
