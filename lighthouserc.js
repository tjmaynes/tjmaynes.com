module.exports = {
  ci: {
    collect: {
      staticDistDir: "./public",
      numberOfRuns: 1,
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "bf-cache": "off",
        "csp-xss": "off",
      },
    },
  },
};
