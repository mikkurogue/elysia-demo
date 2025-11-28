import { t } from "elysia";

export namespace UserModel {
	export const signInBody = t.Object({
		username: t.String(),
		password: t.String(),
	});

	export type signInBody = typeof signInBody.static;

	export const signInResponse = t.Object({
		username: t.String(),
		token: t.String(),
	});

	export type signInResponse = typeof signInResponse.static;

	export const signInInvalid = t.Literal("Invalid username or password");
	export type signInInvalid = typeof signInInvalid.static;

	export const signUpBody = t.Object({
		username: t.String({ minLength: 3 }),
		password: t.String({ minLength: 8 }),
		email: t.String({ format: "email" }),
	});

	export type signUpBody = typeof signUpBody.static;

	export const signUpResponse = t.Object({
		username: t.String(),
		email: t.String(),
	});

	export type signUpResponse = typeof signUpResponse.static;

	export const signUpInvalid = t.Union([
		t.Literal("Username already exists"),
		t.Literal("Email already exists"),
	]);

	export type signUpInvalid = typeof signUpInvalid.static;
}
