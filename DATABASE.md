# Database Setup

This project uses Drizzle ORM with PostgreSQL.

## Quick Start

1. **Start the database:**
   ```bash
   docker compose up -d
   ```

2. **Generate migrations from schema changes:**
   ```bash
   bun run db:generate
   ```

3. **Push schema to database (for development):**
   ```bash
   bun run db:push
   ```

4. **Run migrations (for production):**
   ```bash
   bun run db:migrate
   ```

5. **Open Drizzle Studio (database GUI):**
   ```bash
   bun run db:studio
   ```

## Available Commands

- `db:generate` - Generate migration files from schema changes
- `db:push` - Push schema directly to database (fast, for dev)
- `db:migrate` - Run migrations (for production)
- `db:studio` - Open Drizzle Studio web interface

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=elysiadb
```

## Workflow

### Development
Use `bun run db:push` to quickly sync your schema changes to the database.

### Production
1. Make schema changes in `src/database/schema.ts`
2. Run `bun run db:generate` to create migration files
3. Commit the migration files
4. Run `bun run db:migrate` in production

## Database Connection

Import the database instance from `src/database/db.ts`:

```typescript
import { db } from "./database/db";
import { table } from "./database/schema";

// Example query
const users = await db.select().from(table.user);
```
