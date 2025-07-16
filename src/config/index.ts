import { config } from "dotenv";
config({ path: ".env" });

export const {
  PORT,
} = process.env;

export const {
DB_NAME_SQLITE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
} = process.env;
