import type { NodePluginSchema } from 'gatsby'

export const GatsbySchemaMock = {
  buildObjectType: jest.fn(),
  buildUnionType: jest.fn(),
  buildInterfaceType: jest.fn(),
  buildInputObjectType: jest.fn(),
  buildEnumType: jest.fn(),
  buildScalarType: jest.fn(),
} as NodePluginSchema
