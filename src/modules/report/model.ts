import { t } from "elysia";

export namespace ReportModel {
	export const getReport = t.Object({
		reportId: t.String(),
		userId: t.String(),
	});

	export type GetReport = typeof getReport.static;

	export const getReportSuccess = t.Object({
		report: t.Object({
			id: t.String(),
			userId: t.String(),
			title: t.String(),
			content: t.String(),
			createdAt: t.Date(),
			updatedAt: t.Date(),
		}),
	});

	export type GetReportSuccess = typeof getReportSuccess.static;
}
