const configFixture = jest.requireActual<
	typeof import('@test/fixtures/config')
>('@test/fixtures/config');

const mock = jest.fn().mockReturnValue(configFixture);

export default mock;
