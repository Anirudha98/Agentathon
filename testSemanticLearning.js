import { handleOverride } from "./agent/decisionEngine.js";
import { getMCPContext } from "./mcp/index.js";

(async () => {
  // Step 1: simulate learning
  handleOverride("coffee");
  handleOverride("coffee");
  handleOverride("coffee");

  // Step 2: inspect semantic interpretation
  const context = await getMCPContext("starbucks");
  console.log(context.semanticSignals);
})();
