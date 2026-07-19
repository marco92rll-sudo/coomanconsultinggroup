import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "whoami",
  title: "Who am I",
  description: "Returns the signed-in user's email and id — useful to verify the MCP connection is authenticated.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    return {
      content: [{
        type: "text",
        text: `Signed in as ${ctx.getUserEmail() ?? "(no email)"} (${ctx.getUserId()})`,
      }],
    };
  },
});
