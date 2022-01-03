import type { Actions } from 'gatsby';

export const GatsbyActionsMock = {
  addThirdPartySchema: jest.fn(),
  createFieldExtension: jest.fn(),
  createJob: jest.fn(),
  createJobV2: jest.fn(),
  createNode: jest.fn(),
  createNodeField: jest.fn(),
  createPage: jest.fn(),
  createParentChildLink: jest.fn(),
  createRedirect: jest.fn(),
  createTypes: jest.fn(),
  deleteNode: jest.fn(),
  deletePage: jest.fn(),
  endJob: jest.fn(),
  printTypeDefinitions: jest.fn(),
  replaceWebpackConfig: jest.fn(),
  setBabelOptions: jest.fn(),
  setBabelPlugin: jest.fn(),
  setBabelPreset: jest.fn(),
  setJob: jest.fn(),
  setPluginStatus: jest.fn(),
  setWebpackConfig: jest.fn(),
  touchNode: jest.fn()
} as Actions;
