import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { table } from "./schema";

const connectionString = `postgres://${process.env.DB_USER || "postgres"}:${process.env.DB_PASSWORD || "postgres"}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || "elysiadb"}`;

const client = postgres(connectionString);

export const db = drizzle(client, { schema: table });
