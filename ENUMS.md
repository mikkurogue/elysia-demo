# Drizzle Enum Handling

## PostgreSQL Enums in Drizzle

Drizzle supports two approaches for enums:

### 1. pgEnum (PostgreSQL Native Enums)
```typescript
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['user', 'admin', 'moderator']);

export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  role: roleEnum("role").notNull(),
});
```

**Pros:** Type-safe, enforced at database level
**Cons:** PostgreSQL doesn't support removing enum values or reordering. You can only ADD values.

### 2. varchar/text with TypeScript Union (Recommended)
```typescript
export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  role: varchar("role", { enum: ['user', 'admin', 'moderator'] }).notNull(),
});
```

**Pros:** Flexible - can add/remove values easily, just a CHECK constraint
**Cons:** Not a "true" database enum

## Updating Enums

### If using pgEnum (the painful way):
Adding a value works fine:
```sql
ALTER TYPE role ADD VALUE 'superadmin';
```

But removing/renaming requires:
1. Create new enum type
2. Add temporary column
3. Migrate data
4. Drop old column
5. Rename new column
6. Drop old enum type

**Drizzle won't auto-generate this - you'll write custom SQL migrations.**

### If using varchar with enum (the easy way):
Just update the schema and run `db:push` or `db:generate`:
```typescript
// Before
role: varchar("role", { enum: ['user', 'admin'] })

// After - just change it!
role: varchar("role", { enum: ['user', 'admin', 'moderator', 'superadmin'] })
```

## Recommendation

**Use `varchar` with TypeScript enum types** instead of `pgEnum` for flexibility:

```typescript
// schema.ts
export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  role: varchar("role", { length: 50 }).notNull().default('user'),
});

// Separate TypeScript type for type safety
export type UserRole = 'user' | 'admin' | 'moderator';
```

This gives you:
- Easy migrations when enum values change
- TypeScript type safety in your code
- No PostgreSQL enum headaches
