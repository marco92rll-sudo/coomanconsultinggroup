import { auth, defineMcp } from "@lovable.dev/mcp-js";
import whoamiTool from "./tools/whoami";
import listMyAssessmentsTool from "./tools/list-my-assessments";
import getAssessmentReportTool from "./tools/get-assessment-report";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "ccg-app-mcp",
  title: "Cooman Consulting Group",
  version: "0.1.0",
  instructions:
    "Tools for Cooman Consulting Group. Use `whoami` to verify the connection, `list_my_assessments` to list AI Tools Assessments tied to the signed-in user's email, and `get_assessment_report` to fetch the full report for a specific assessment.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [whoamiTool, listMyAssessmentsTool, getAssessmentReportTool],
});
