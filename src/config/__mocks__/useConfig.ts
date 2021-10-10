const configFixture = jest.requireActual<
typeof import('../../../__tests__/fixtures/config')
>('../../../__tests__/fixtures/config');

const mock = jest.fn().mockReturnValue(configFixture);

export default mock;
