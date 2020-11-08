import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { BehaviorSubject } from 'rxjs';

export interface AppStore {
	readonly selectedGenre: BehaviorSubject<string>;
	readonly setSelectedGenre: (genre: string) => void;
}

export interface NewAppStore {
	(): AppStore;
}

export const newAppStore = context.of<unknown, NewAppStore>(() => {
	const selectedGenre = new BehaviorSubject<string>('all');
	const setSelectedGenre = (genre: string) => selectedGenre.next(genre);

	return { selectedGenre, setSelectedGenre };
});
