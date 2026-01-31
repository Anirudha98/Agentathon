import { getMCPContext } from "./mcp/index.js";

(async () => {
  console.log(await getMCPContext("starbucks"));
})();
