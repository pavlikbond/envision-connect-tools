import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings.js";
import md5 from "md5";
import pgvector from "pgvector/pg";
import { connectDb } from "../utils/utils.js";

export async function uploadToDb(file) {
  const client = connectDb();
  const loader = new PDFLoader(file);
  const pages = await loader.load();

  //split and segment the pdf
  const docs = await Promise.all(pages.map(prepareDocument));

  //vectorize and embed individual segments
  const vectors = await Promise.all(docs.flat().map(embedDocument));
  //connect to pg and upload data
  try {
    await client.connect();
    await client.query("CREATE EXTENSION IF NOT EXISTS vector");
    await pgvector.registerType(client);
    await client.query("DROP TABLE IF EXISTS embeddings");
    await client.query(
      "CREATE TABLE embeddings (id SERIAL PRIMARY KEY, hash VARCHAR,text TEXT,namespace VARCHAR(200),vector vector(1536))"
    );

    const text = "INSERT INTO embeddings(hash, text, namespace, vector) VALUES($1, $2, $3, $4)";
    let promises = [];

    for (let vec of vectors) {
      const values = [vec.id, vec.metadata.text, "your_namespace", pgvector.toSql(vec.values)];
      promises.push(client.query(text, values));
    }

    try {
      await Promise.all(promises);
      console.log("All data inserted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  } catch (error) {
    console.log("error connecting to db", error);
  } finally {
    await client.end();
  }
  return;
}

async function embedDocument(doc) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.log("error embedding document", error);
  }
}

export const truncateStringByBytes = (str, bytes) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page) {
  let { pageContent, metadata } = page;

  pageContent = pageContent.replace(/\n/g, "");
  //split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}
