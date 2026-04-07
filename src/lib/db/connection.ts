import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "dotenv";

config();

let db: any = null;

if (process.env.DATABASE_POOLER_URL) {
  console.log("🗄️  Using PostgreSQL database");
  const client = postgres(process.env.DATABASE_POOLER_URL);
  db = drizzle(client, { schema });
}

export default db;
