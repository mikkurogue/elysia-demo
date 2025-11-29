import { status } from "elysia";
import { and, eq } from "drizzle-orm";

import type { ReportModel } from "./model";
import { db } from "../../database/db";
import { reports } from "../../database/schema";

export abstract class ReportService {
	static async getReport({ reportId, userId }: ReportModel.GetReport) {
		if (!reportId) {
			throw status(400, "No report id provided");
		}

		const [foundReport] = await db
			.select()
			.from(reports)
			.where(and(eq(reports.id, reportId), eq(reports.userId, userId)))
			.limit(1);

		if (!foundReport) {
			throw status(400, "Bad request");
		}

		return {
			report: foundReport,
		};
	}
}
