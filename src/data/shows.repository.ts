import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { newSink, Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { pipe } from 'fp-ts/lib/function';
import { httpRequest } from '../api/http-client';
import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import { ShowModel } from '../domain/show.model';
import { validateShows } from './shows.model';

export interface ShowsRepository {
	readonly shows: Observable<RemoteData<Error, Array<ShowModel>>>;
}

export interface NewShowsRepository {
	(): Sink<ShowsRepository>;
}

export const newShowsRepository = context.of<unknown, NewShowsRepository>(
	(): Sink<ShowsRepository> => {
		const shows = pipe(
			httpRequest('http://api.tvmaze.com/shows'),
			map((shows) => {
				if (remoteData.isSuccess(shows)) {
					if (validateShows(shows.value)) {
						return remoteData.success(
							shows.value.map(({ name, id, genres, image, summary }) => ({
								name,
								id,
								genres,
								image,
								summary,
							})),
						);
					}
					return remoteData.failure(
						new Error('http://api.tvmaze.com/shows endpoint has returned invalid data'),
					);
				}
				return shows;
			}),
			shareReplay({ bufferSize: 1, refCount: true }),
		);

		return newSink({ shows }, shows);
	},
);
