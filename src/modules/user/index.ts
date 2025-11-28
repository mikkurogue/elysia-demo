import { Elysia } from "elysia";

import { UserModel } from "./model";
import { UserService } from "./service";

export const user = new Elysia({ prefix: "/user" }).post(
	"/sign-in",
	async function ({ body, cookie: { session } }) {
		const response = await UserService.signIn(body);

		session.value = response.token;

		return response;
	},
	{
		body: UserModel.signInBody,
		response: {
			200: UserModel.signInResponse,
			400: UserModel.signInInvalid,
		},
	},
);
