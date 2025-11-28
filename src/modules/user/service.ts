import { status } from "elysia";

import type { UserModel } from "./model";
import { Parser } from "../../util/parser";

export abstract class UserService {
	// Simulated sign-in function - in a real application, this would involve checking a database
	static async signIn({ username, password }: UserModel.signInBody) {
		const user = Parser.parseUser({ username, password }).match(
			(t) => t,
			(e) => {
				throw status(400, e);
			},
		);

		return {
			username: user.username,
			token: "Some-generated-token",
		};
	}
}
