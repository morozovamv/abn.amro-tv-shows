import { ShowModel } from '../domain/show.model';

export const validateImage = (image: any): image is ShowModel['image'] =>
	image instanceof Object &&
	image.hasOwnProperty('medium') &&
	typeof image.medium === 'string' &&
	image.hasOwnProperty('original') &&
	typeof image.original === 'string';

export const validateShows = (shows: any): shows is ShowModel[] =>
	Array.isArray(shows) &&
	shows.every(
		(show) =>
			show instanceof Object &&
			show.hasOwnProperty('id') &&
			typeof show.id === 'number' &&
			show.hasOwnProperty('name') &&
			typeof show.name === 'string' &&
			show.hasOwnProperty('image') &&
			validateImage(show.image) &&
			show.hasOwnProperty('summary') &&
			typeof show.summary === 'string' &&
			Array.isArray(show.genres) &&
			show.genres.every((i: any) => typeof i === 'string'),
	);
