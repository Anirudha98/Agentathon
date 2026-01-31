import { getDecision, handleOverride } from "./agent/decisionEngine.js";

handleOverride("coffee");
handleOverride("coffee");
handleOverride("coffee");

(async () => {
  console.log(await getDecision("starbucks"));
})();
