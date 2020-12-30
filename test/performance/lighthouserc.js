module.exports = {
  ci: {
    collect: {
      staticDistDir: '../../build'
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    }
  },
};
