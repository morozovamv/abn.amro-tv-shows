import { validateImage, validateShow, validateShows } from './shows.model';

describe('Search model', () => {
	describe('validateImage', () => {
		it('should return false if at least one property is null', () => {
			const invalidImageData = { original: '', medium: null };
			const validated = validateImage(invalidImageData);

			expect(validated).toBeFalsy();
		});

		it('should return false if at least one property is missed', () => {
			// medium property is missed
			const invalidImageData = { original: '' };
			const validated = validateImage(invalidImageData);

			expect(validated).toBeFalsy();
		});

		it('should return false if least one property includes incorrect type', () => {
			// both original and medium should be string
			const invalidImageData = { original: '', medium: 1 };
			const validated = validateImage(invalidImageData);

			expect(validated).toBeFalsy();
		});

		it('should return true if image data is correct', () => {
			// both original and medium should be string
			const validImageData = { original: '', medium: '' };
			const validated = validateImage(validImageData);

			expect(validated).toBeTruthy();
		});
	});

	describe('validateShow', () => {
		it('should return false if at least one property excluding summary is null', () => {
			const invalidShowData = {
				id: 1,
				genres: [''],
				name: null,
				image: { original: '', medium: '' },
				summary: '',
			};
			const validated = validateShow(invalidShowData);

			expect(validated).toBeFalsy();
		});

		it('should return true if show data is valid', () => {
			const validShowData = {
				id: 1,
				genres: [''],
				name: '',
				image: { original: '', medium: '' },
				summary: '',
			};
			const validated = validateShow(validShowData);

			expect(validated).toBeTruthy();
		});
	});

	describe('validateShows', () => {
		it('should return false if at least one entity is invalid', () => {
			const validShowData = {
				id: 1,
				genres: [''],
				name: '',
				image: { original: '', medium: '' },
				summary: '',
			};
			const invalidShowData = {
				id: 1,
				genres: [''],
				name: null,
				image: { original: '', medium: '' },
				summary: '',
			};
			const validated = validateShows([validShowData, invalidShowData]);

			expect(validated).toBeFalsy();
		});

		it('should return true if shows data is valid', () => {
			const validImageData = {
				id: 1,
				genres: [''],
				name: '',
				image: { original: '', medium: '' },
				summary: '',
			};
			const validated = validateShows([validImageData]);

			expect(validated).toBeTruthy();
		});

		it('should return true if shows data includes any extra properties, but expected properties are correct', () => {
			const validImageData_0 = {
				id: 1,
				genres: [''],
				name: '',
				image: { original: '', medium: '' },
				summary: '',
			};
			const validImageData_1 = {
				id: 1,
				genres: [''],
				name: '',
				image: { original: '', medium: '' },
				summary: '',
				property: 666,
			};
			const validated = validateShows([validImageData_0, validImageData_1]);

			expect(validated).toBeTruthy();
		});
	});
});
