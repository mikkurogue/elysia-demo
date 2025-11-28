import { Elysia } from "elysia";
import { UserService } from "./modules/user/service";

const app = new Elysia()
	.get("/", function () {
		"Hello Elysia";
	})
	.post("/user", async function () {
		const res = await UserService.signIn({
			username: "test1",
			password: "password",
		});

		return res;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
