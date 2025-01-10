module.exports = {
  hooks: {
    'pre-commit': 'yarn check-types && yarn lint --fix',
    'pre-push': 'npm test:coverage',
  },
};
