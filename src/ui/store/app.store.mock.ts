import { option } from 'fp-ts';
import { constVoid } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { BehaviorSubject } from 'rxjs';
import { AppStore } from './app.store';

export const APP_STORE_MOCK: AppStore = {
	selectedGenre: new BehaviorSubject(''),
	setSelectedGenre: constVoid,
	selectedShowId: new BehaviorSubject<Option<number>>(option.none),
	selectShow: constVoid,
};
