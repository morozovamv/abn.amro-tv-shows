import { EMPTY } from 'rxjs';
import { SearchRepository } from './search.repository';

export const SEARCH_REPOSITORY_MOCK: SearchRepository = {
	searchShows: () => EMPTY,
};
