import { constVoid } from 'fp-ts/lib/function';
import { BehaviorSubject } from 'rxjs';
import { AppStore } from './app.store';

export const APP_STORE_MOCK: AppStore = {
	selectedGenre: new BehaviorSubject(''),
	setSelectedGenre: constVoid,
};
