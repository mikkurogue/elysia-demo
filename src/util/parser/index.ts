import { err, ok, type Result } from "neverthrow";
import { UserModel } from "../../modules/user/model";

/**
 * Parser namespace for parsing and validating data
 */
export namespace Parser {
	/**
	 * Parses and validates user sign-in data
	 * @param user - The user sign-in data to parse
	 * @returns A Result containing either the valid user data or an error message
	 */
	export function parseUser(
		user: UserModel.signInBody,
	): Result<UserModel.signInBody, UserModel.signInInvalid> {
		// simulate for now, just for demonstration
		if (user.username !== "test" || user.password !== "password") {
			return err(
				"Invalid username or password" satisfies UserModel.signInInvalid,
			);
		}

		return ok(user);
	}
}
