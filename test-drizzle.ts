import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./src/database/schema";

const client = postgres("postgresql://postgres:postgres@localhost:5432/elysiadb");

// Test syntax 1
const db1 = drizzle(client, { schema });

// Test syntax 2  
const db2 = drizzle({ client, schema });

console.log(typeof db1, typeof db2);
