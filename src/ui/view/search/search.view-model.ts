import { RemoteData } from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { pipe } from 'fp-ts/lib/function';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { SearchRepository } from '../../../data/search.repository';
import { SearchModel } from '../../../domain/search.model';

export interface SearchViewModel {
	readonly shows: Observable<RemoteData<Error, SearchModel>>;
	readonly query: BehaviorSubject<string>;
	readonly onQueryChange: (search: string) => void;
	readonly onSearch: (search: string) => void;
}

export interface NewSearchViewModel {
	(): SearchViewModel;
}

export const newSearchViewModel = context.combine(
	context.key<SearchRepository>()('searchRepository'),
	(searchRepository): NewSearchViewModel => () => {
		const query = new BehaviorSubject<string>('');
		const requestSearch = new BehaviorSubject<string>('');

		const shows = pipe(
			requestSearch,
			switchMap((query) => searchRepository.searchShows(query)),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

		return {
			shows,
			query,
			onQueryChange: (value: string) => query.next(value),
			onSearch: (value: string) => requestSearch.next(value),
		};
	},
);
