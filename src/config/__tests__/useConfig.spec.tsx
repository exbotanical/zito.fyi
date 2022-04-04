import { renderHook } from '../../../test/utils/renderHook';
import * as gatsby from 'gatsby';
import { mocked } from 'jest-mock';

import { config } from '../../../test/fixtures/config';
import { useConfig } from '../useConfig';

const siteConfigQueryResponse = {
	site: {
		siteMetadata: {
			config
		}
	}
};

jest.mock('gatsby', () => {
	const actualGatsby = jest.requireActual<typeof gatsby>('gatsby');

	return {
		...actualGatsby,
		useStaticQuery: jest.fn(),
		graphql: jest.fn()
	};
});

const mockedGatsby = mocked(gatsby, true);

describe('hook `useConfig`', () => {
	it('correctly queries and provides site configuration data', () => {
		mockedGatsby.useStaticQuery.mockImplementation(
			() => siteConfigQueryResponse
		);

		const { result } = renderHook(() => {
			return useConfig();
		});

		// @tmp @todo `renderHook` util invokes twice until this is fixed
		expect(mockedGatsby.graphql).toHaveBeenCalledTimes(2);
		expect(mockedGatsby.useStaticQuery).toHaveBeenCalledTimes(2);

		expect(result.current).toBe(config);
	});

	it.only('throws an error if site configuration is not extant', () => {
		mockedGatsby.useStaticQuery.mockImplementation(() => ({ site: undefined }));

		const { result } = renderHook(useConfig);
		console.log({ result });
		// expect(result.error).toBeDefined();

		expect(mockedGatsby.graphql).toHaveBeenCalledTimes(2); // ?
		expect(mockedGatsby.useStaticQuery).toHaveBeenCalledTimes(2);
	});
});
