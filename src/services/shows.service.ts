import { Observable } from 'rxjs';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { newSink, Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { pipe } from 'fp-ts/lib/function';
import { RemoteData } from '@devexperts/remote-data-ts';
import { liveData } from '@devexperts/rx-utils/dist/live-data.utils';
import { ShowsRepository } from '../data/shows.repository';

export interface ShowsService {
	readonly shows: Observable<RemoteData<Error, Array<{ name: string; id: number; genres: Array<string> }>>>;
	readonly genres: Observable<RemoteData<Error, Array<string>>>;
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

		return newSink({ shows, genres }, shows);
	},
);
