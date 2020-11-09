import { getUnique } from '../array.utils';

describe('array.utils', () => {
	describe('getUnique', () => {
		it('should return an array of unique items', () => {
			const source = ['1', '1', '2', '3', '1', '3'];
			const expected = ['1', '2', '3'];

			expect(getUnique(source)).toEqual(expected);
		});
	});
});
