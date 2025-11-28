import { Elysia } from "elysia";
import { user } from "./modules/user";

const app = new Elysia()
	.get("/", function () {
		return "Hello Elysia";
	})
	.use(user)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
