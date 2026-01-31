import { getDecision } from "./agent/decisionEngine.js";

(async () => {
  console.log(await getDecision("starbucks"));
})();
