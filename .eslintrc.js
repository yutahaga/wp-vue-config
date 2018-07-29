module.exports = {
  root: true,
  extends: [
    'plugin:@mysticatea/es2015',
    'plugin:@mysticatea/+node',
  ],
  rules: {
    strict: 'off',
    'no-process-env': 'off',
    '@mysticatea/prefer-for-of': 'off',
    '@mysticatea/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
