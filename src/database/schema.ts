import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
	id: varchar("id", { length: 128 })
		.primaryKey()
		.$defaultFn(() => createId()),
	username: varchar("username", { length: 255 }).notNull().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
