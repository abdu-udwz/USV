/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const base = require('../../jest.config')
const { pathsToModuleNameMapper } = require('ts-jest')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig')


/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...base,
  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.spec.ts',
  ], 
  displayName: {
    name: 'server',
    color: 'cyan',
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
}