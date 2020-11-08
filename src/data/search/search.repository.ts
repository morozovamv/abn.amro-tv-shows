import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { pipe } from 'fp-ts/lib/function';
import { httpRequest } from '../../api/http-client';
import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import { validateSearch } from './search.model';
import { SearchModel } from '../../domain/search.model';

export interface SearchRepository {
	readonly searchShows: (query: string) => Observable<RemoteData<Error, SearchModel>>;
}

export interface NewSearchRepository {
	(): SearchRepository;
}

export const newSearchRepository = context.of<unknown, NewSearchRepository>(() => {
	const searchShows = (query: string) =>
		pipe(
			httpRequest('http://api.tvmaze.com/search/shows?q=' + query),
			map((searchResponse) => {
				if (remoteData.isSuccess(searchResponse)) {
					if (validateSearch(searchResponse.value)) {
						return remoteData.success(
							searchResponse.value.map(({ show: { name, id, genres, image, summary } }) => ({
								name,
								id,
								genres,
								image,
								summary,
							})),
						);
					}
					return remoteData.failure(
						new Error('http://api.tvmaze.com/search endpoint has returned invalid data'),
					);
				}
				return searchResponse;
			}),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

	return { searchShows };
});
