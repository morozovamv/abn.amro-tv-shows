import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { option } from 'fp-ts';
import { Option } from 'fp-ts/lib/Option';
import { BehaviorSubject } from 'rxjs';

export interface AppStore {
	readonly selectedGenre: BehaviorSubject<string>;
	readonly setSelectedGenre: (genre: string) => void;
	readonly selectedShowId: BehaviorSubject<Option<number>>;
	// TODO: probably it's better to remove Option context after using router
	readonly selectShow: (showId: Option<number>) => void;
}

export interface NewAppStore {
	(): AppStore;
}

export const newAppStore = context.of<unknown, NewAppStore>(() => {
	const selectedGenre = new BehaviorSubject<string>('all');
	const setSelectedGenre = (genre: string) => selectedGenre.next(genre);

	const selectedShowId = new BehaviorSubject<Option<number>>(option.none);
	const selectShow = (showId: Option<number>) => selectedShowId.next(showId);

	return { selectedGenre, setSelectedGenre, selectedShowId, selectShow };
});
