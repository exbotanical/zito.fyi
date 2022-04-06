const configFixture =
	jest.requireActual<typeof import('@@/fixtures/config')>('@@/fixtures/config');

const mock = jest.fn().mockReturnValue(configFixture);

export default mock;
