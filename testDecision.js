import { getDecision } from "./agent/decisionEngine.js";

const decision = await getDecision("starbucks");
console.log(decision);
