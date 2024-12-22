import type { Config } from "jest";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

export default (): Config => ({
  preset: "ts-jest",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less)$": "<rootDir>/tests/_mocks_/styleMock.ts",
    "@enums/(.*)": "<rootDir>/src/enums/$1",
    "@pages/(.*)": "<rootDir>/src/pages/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@tests/(.*)": "<rootDir>/src/tests/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@contexts/(.*)": "<rootDir>/src/contexts/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@store/(.*)": "<rootDir>/src/store/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
  },
  globals: {
    TextDecoder,
    TextEncoder,
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { env: { VERSION: "dev" } } },
            },
          ],
        },
      },
    ],
  },
});
