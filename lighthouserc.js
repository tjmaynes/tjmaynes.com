module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: "http://localhost:9900",
      startServerReadyTimeout: 60 * 5, // 5 minutes
      numberOfRuns: 1,
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "bf-cache": "off",
        "csp-xss": "off",
        "uses-long-cache-ttl": "off",
        "total-byte-weight": "off",
      },
    },
  },
};
