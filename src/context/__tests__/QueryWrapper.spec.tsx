import { QueryWrapper } from '../QueryWrapper';

describe('context QueryWrapper', () => {
	it('renders correctly', () => {
		const ret = QueryWrapper({ element: 'Test' });

		expect(ret).toMatchSnapshot();
	});
});
