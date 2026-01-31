// mcp/index.js

import { getUserProfile } from "./userProfile.js";
import { getTransactionContext } from "./transactionContext.js";
import { getBehaviorPatterns } from "./behaviorPatterns.js";

export async function getMCPContext(transactionId) {
  const [userProfile, transactionContext, behaviorPatterns] =
    await Promise.all([
      getUserProfile(),
      getTransactionContext(transactionId),
      getBehaviorPatterns()
    ]);

  return {
    userProfile,
    transactionContext,
    behaviorPatterns
  };
}
