// mcp/behaviorPatterns.js

const behaviorPatterns = {
  overrides: {
    coffee: 4,
    lateNightShopping: 1
  },

  preferences: {
    fridayCoffee: true
  },

  knownTriggers: [
    "late-night",
    "e-commerce"
  ]
};

export function getBehaviorPatterns() {
  return behaviorPatterns;
}

// Optional: update behavior during demo
export function recordOverride(type) {
  if (!behaviorPatterns.overrides[type]) {
    behaviorPatterns.overrides[type] = 0;
  }
  behaviorPatterns.overrides[type] += 1;
}
