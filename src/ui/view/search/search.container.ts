import * as remoteData from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { useBehaviorSubject } from '../../../utils/use-behavior-subject';
import { useObservable } from '../../../utils/use-observable';
import { Search } from './search.component';
import { newSearchViewModel } from './search.view-model';

export const SearchContainer = context.combine(newSearchViewModel, (newSearchViewModel) =>
	memo(() => {
		const vm = useMemo(() => newSearchViewModel(), []);
		const shows = useObservable(vm.shows, remoteData.pending);
		const query = useBehaviorSubject(vm.query);

		return createElement(Search, { shows, query, onQueryChange: vm.onQueryChange, onSearch: vm.onSearch });
	}),
);
