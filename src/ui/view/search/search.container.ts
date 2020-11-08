import * as remoteData from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { Option } from 'fp-ts/lib/Option';
import { createElement, memo, useCallback, useMemo } from 'react';
import { useBehaviorSubject } from '../../../utils/use-behavior-subject.utils';
import { useObservable } from '../../../utils/use-observable.utils';
import { AppStore } from '../../store/app.store';
import { Search } from './search.component';
import { newSearchViewModel } from './search.view-model';

export const SearchContainer = context.combine(
	newSearchViewModel,
	context.key<AppStore>()('appStore'),
	(newSearchViewModel, appStore) =>
		memo(() => {
			const vm = useMemo(() => newSearchViewModel(), []);
			const shows = useObservable(vm.shows, remoteData.pending);
			const query = useBehaviorSubject(vm.query);
			const selectShow = useCallback((showId: Option<number>) => appStore.selectShow(showId), []);

			return createElement(Search, {
				shows,
				query,
				onQueryChange: vm.onQueryChange,
				onSearch: vm.onSearch,
				selectShow,
			});
		}),
);
