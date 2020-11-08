import { RemoteData } from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { pipe } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShowModel } from '../../../domain/show.model';
import { ShowsService } from '../../../services/shows.service';
import { AppStore } from '../../store/app.store';

export interface ShowDetailsViewModel {
	readonly show: Observable<RemoteData<Error, Option<ShowModel>>>;
}

export interface NewShowDetailsViewModel {
	(): ShowDetailsViewModel;
}

export const newShowDetailsViewModel = context.combine(
	context.key<AppStore>()('appStore'),
	context.key<ShowsService>()('showsService'),
	(appStore, showsService): NewShowDetailsViewModel => () => {
		const show = pipe(
			appStore.selectedShowId,
			switchMap((selectedShowId) => showsService.getShowById(selectedShowId)),
		);

		return { show };
	},
);
