const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"], 
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], 
  moduleFileExtensions: ["ts", "js", "json", "node"],
  verbose: true,
};