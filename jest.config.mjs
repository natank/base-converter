export default {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
