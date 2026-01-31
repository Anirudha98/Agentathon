const behaviorPatterns = {
  overrides: {
    coffee: 0,
    lateNightShopping: 0
  },
  preferences: {},
  knownTriggers: []
};

export function getBehaviorPatterns() {
  return behaviorPatterns;
}

export function recordOverride(type) {
  behaviorPatterns.overrides[type] = (behaviorPatterns.overrides[type] || 0) + 1;

  if (behaviorPatterns.overrides[type] >= 3) {
    behaviorPatterns.preferences[type] = "learned";
  }
}
