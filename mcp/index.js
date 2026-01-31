import { getUserProfile } from "./userProfile.js";
import { getTransactionContext } from "./transactionContext.js";
import { getBehaviorPatterns } from "./behaviorPatterns.js";
import { interpretBehavior } from "./behaviorInterpreter.js";

export async function getMCPContext(transactionId) {
  const [userProfile, transactionContext, behaviorPatterns] =
    await Promise.all([
      getUserProfile(),
      getTransactionContext(transactionId),
      getBehaviorPatterns()
    ]);

  const semanticSignals = interpretBehavior(
    transactionContext, behaviorPatterns, userProfile
  );

  return {
    userProfile,
    transactionContext,
    behaviorPatterns,
    semanticSignals
  };
}
