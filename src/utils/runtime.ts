export const isLocalRuntime = process.env.NODE_ENV !== 'production'
export const isBrowserRuntime = globalThis.window !== undefined
