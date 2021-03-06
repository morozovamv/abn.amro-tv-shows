import { RemoteData } from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShowsService } from '../../../services/shows.service';
import { AppStore } from '../../store/app.store';

export interface GenreSelectorViewModel {
	readonly genres: Observable<RemoteData<Error, Array<string>>>;
	readonly selectedGenre: BehaviorSubject<string>;
	readonly setSelectedGenre: (genre: string) => void;
}

export interface NewGenreSelectorViewModel {
	(): GenreSelectorViewModel;
}

export const newGenreSelectorViewModel = context.combine(
	context.key<ShowsService>()('showsService'),
	context.key<AppStore>()('appStore'),
	(showsService, appStore): NewGenreSelectorViewModel => () => ({
		genres: showsService.genres,
		selectedGenre: appStore.selectedGenre,
		setSelectedGenre: appStore.setSelectedGenre,
	}),
);
