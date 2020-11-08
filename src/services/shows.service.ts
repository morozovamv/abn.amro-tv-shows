import { Observable } from 'rxjs';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { newSink, Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { pipe } from 'fp-ts/lib/function';
import { RemoteData } from '@devexperts/remote-data-ts';
import { liveData } from '@devexperts/rx-utils/dist/live-data.utils';
import { ShowsRepository } from '../data/shows/shows.repository';
import { array, option } from 'fp-ts';
import { Option } from 'fp-ts/lib/Option';
import { ShowModel } from '../domain/show.model';

export interface ShowsService {
	readonly shows: Observable<RemoteData<Error, Array<ShowModel>>>;
	readonly genres: Observable<RemoteData<Error, Array<string>>>;
	readonly getShowById: (showId: Option<number>) => Observable<RemoteData<Error, Option<ShowModel>>>;
}

export interface NewShowsService {
	(): Sink<ShowsService>;
}

export const newShowsService = context.combine(
	context.key<ShowsRepository>()('showsRepository'),
	(showsRepository): NewShowsService => () => {
		const shows = showsRepository.shows;

		const genres = pipe(
			shows,
			liveData.map((shows) => {
				// TODO: move to utils
				let uniqGenres = new Set<string>();
				shows
					.map((show) => show.genres)
					.flat()
					.forEach((genre) => uniqGenres.add(genre));

				return Array.from(uniqGenres);
			}),
		);

		const getShowById = (showId: Option<number>) =>
			pipe(
				shows,
				liveData.map((shows) =>
					pipe(
						shows,
						array.findFirst((show) =>
							pipe(
								showId,
								option.exists((showId) => showId === show.id),
							),
						),
					),
				),
			);

		return newSink({ shows, genres, getShowById }, shows);
	},
);
