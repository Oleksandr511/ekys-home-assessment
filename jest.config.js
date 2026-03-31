module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { configFile: "./babel.config.js" },
    ],
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}",
    "<rootDir>/src/**/*.test.{ts,tsx}",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/types/**"],
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
  testPathIgnorePatterns: ["/node_modules/", "/.expo/"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
      },
    },
  },
};
