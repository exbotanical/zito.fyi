import '@testing-library/jest-dom'

beforeEach(() => {
  // @see https://stackoverflow.com/a/53449595/15159240
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  jest.clearAllMocks()
  jest.clearAllTimers()
})
