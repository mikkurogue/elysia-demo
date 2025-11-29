import { Elysia } from "elysia";

import { ReportModel } from "./model";
import { ReportService } from "./service";

export const report = new Elysia({ prefix: "/report" }).get(
	"/report",
	async function ({ body }) {
		const response = await ReportService.getReport(body);

		return response;
	},
	{
		body: ReportModel.getReport,
		response: {
			200: ReportModel.getReportSuccess,
		},
	},
);
