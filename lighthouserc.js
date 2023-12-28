module.exports = {
  ci: {
    collect: {
      staticDistDir: "./public",
      numberOfRuns: 1,
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "bf-cache": "off",
        "csp-xss": "off",
        "uses-long-cache-ttl": "off",
        "total-byte-weight": "off"
      },
    },
  },
};
