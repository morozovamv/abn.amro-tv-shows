import { RemoteData } from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { liveData } from '@devexperts/rx-utils/dist/live-data.utils';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShowModel } from '../../../domain/show.model';
import { ShowsService } from '../../../services/shows.service';
import { AppStore } from '../../store/app.store';

export interface ShowsList {
	readonly shows: Observable<RemoteData<Error, Array<ShowModel>>>;
}

export interface NewShowsListViewModel {
	(): ShowsList;
}

export const newShowsListViewModel = context.combine(
	context.key<ShowsService>()('showsService'),
	context.key<AppStore>()('appStore'),
	(showsService, appStore): NewShowsListViewModel => () => {
		const shows = pipe(
			appStore.selectedGenre,
			switchMap((selectedGenre) =>
				pipe(
					showsService.shows,
					liveData.map((shows) => {
						if (selectedGenre !== 'all') {
							return pipe(
								shows,
								array.filter((show) => show.genres.includes(selectedGenre)),
							);
						}
						return shows;
					}),
				),
			),
		);

		return { shows };
	},
);
