import { ShowModel } from '../domain/show.model';
import { validateShow } from './shows.model';

// TODO: add search score
export const validateSearch = (searchResult: any): searchResult is { show: ShowModel }[] =>
	Array.isArray(searchResult) &&
	searchResult.every(
		(searchItem) =>
			searchItem instanceof Object && searchItem.hasOwnProperty('show') && validateShow(searchItem.show),
	);
