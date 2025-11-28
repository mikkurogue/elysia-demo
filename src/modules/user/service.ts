import { status } from "elysia";
import { fromPromise } from "neverthrow";
import { eq } from "drizzle-orm";

import type { UserModel } from "./model";
import { db } from "../../database/db";
import { users } from "../../database/schema";

export abstract class UserService {
	static async signIn({ username, password }: UserModel.signInBody) {
		const [foundUser] = await db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!foundUser) {
			throw status(400, "Invalid username or password");
		}

		const isValid = await Bun.password.verify(password, foundUser.password);

		if (!isValid) {
			throw status(400, "Invalid username or password");
		}

		return {
			username: foundUser.username,
			token: "Some-generated-token",
		};
	}

	static async signUp({ username, password, email }: UserModel.signUpBody) {
		// Check if username already exists
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (existingUser) {
			throw status(400, "Username already taken");
		}

		// Check if email already exists
		const [existingEmail] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existingEmail) {
			throw status(400, "Email already in use");
		}

		const hashedPassword = await Bun.password.hash(password);

		const result = await fromPromise(
			db
				.insert(users)
				.values({
					username,
					email,
					password: hashedPassword,
				})
				.returning(),
			(error) => {
				if (error instanceof Error && error.message.includes("unique")) {
					return "Username or email already exists";
				}
				return "Failed to create user";
			},
		);

		return result.match(
			([newUser]) => ({
				username: newUser.username,
				email: newUser.email,
			}),
			(error) => {
				throw status(error === "Failed to create user" ? 500 : 400, error);
			},
		);
	}
}
