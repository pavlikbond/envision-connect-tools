import pkg from "pg";
const { Client } = pkg;

export function convertToAscii(inputString) {
  //remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]/g, "");
  return asciiString;
}

export function removeExtraPeriods(inputString) {
  // Use a regular expression to replace consecutive periods with a single period
  var cleanedString = inputString.replace(/\.{2,}/g, ".");

  return cleanedString;
}

export const connectDb = () => {
  const client = new Client({
    user: "postgres",
    host: process.env.POSTGRES_HOST,
    database: "vector_db",
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });

  return client;
};

export const connectDbPostgres = () => {
  const client = new Client({
    user: "postgres",
    host: process.env.POSTGRES_HOST,
    database: "vector_db",
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });

  return client;
};

export const connectDbRailway = () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  return client;
};
