import * as remoteData from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { useObservable } from '../../../utils/use-observable';
import { ShowsList } from './shows-list.component';
import { newShowsListViewModel } from './shows-list.view-model';

export const ShowsListContainer = context.combine(newShowsListViewModel, (newShowsListViewModel) =>
	memo(() => {
		const vm = useMemo(() => newShowsListViewModel(), []);
		const shows = useObservable(vm.shows, remoteData.pending);

		return createElement(ShowsList, { shows });
	}),
);
