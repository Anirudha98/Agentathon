// mcp/behaviorInterpreter.js

export function interpretBehavior(transaction, behaviorPatterns, userProfile) {
  const signals = {
    spendType: "Generic",
    habitStrength: "Low",
    emotionalIntent: "Neutral",
    blockSensitivity: "Medium",
    budgetPressure: "Low",
    regretProbability: "Medium"
  };

  if (
    transaction.merchant.toLowerCase().includes("starbucks") ||
    transaction.merchant.toLowerCase().includes("coffee")
  ) {
    signals.spendType = "Coffee";
    signals.emotionalIntent = "Routine / Comfort";
  }

  const coffeeOverrides = behaviorPatterns.overrides?.coffee || 0;
  if (coffeeOverrides >= 5) signals.habitStrength = "Very High";
  else if (coffeeOverrides >= 3) signals.habitStrength = "High";
  else if (coffeeOverrides >= 1) signals.habitStrength = "Medium";

  if (signals.habitStrength === "High") {
    signals.blockSensitivity = "Low";
  }

  const categoryBudget = userProfile.budgets?.[transaction.category?.toLowerCase()];
  if (categoryBudget) {
    const usage = categoryBudget.spent / categoryBudget.limit;
    if (usage >= 0.9) signals.budgetPressure = "High";
    else if (usage >= 0.75) signals.budgetPressure = "Medium";
  }

  if (
    signals.spendType === "Coffee" &&
    signals.habitStrength === "High" &&
    signals.budgetPressure !== "High"
  ) {
    signals.regretProbability = "Low";
  }

  if (
    transaction.isLateNight &&
    transaction.category === "E-commerce"
  ) {
    signals.spendType = "Impulse Shopping";
    signals.regretProbability = "High";
  }

  return signals;
}
