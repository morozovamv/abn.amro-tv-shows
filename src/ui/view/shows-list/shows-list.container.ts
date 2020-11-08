import * as remoteData from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { Option } from 'fp-ts/lib/Option';
import { createElement, memo, useCallback, useMemo } from 'react';
import { useObservable } from '../../../utils/use-observable';
import { AppStore } from '../../store/app.store';
import { ShowsList } from './shows-list.component';
import { newShowsListViewModel } from './shows-list.view-model';

export const ShowsListContainer = context.combine(
	newShowsListViewModel,
	context.key<AppStore>()('appStore'),
	(newShowsListViewModel, appStore) =>
		memo(() => {
			const vm = useMemo(() => newShowsListViewModel(), []);
			const shows = useObservable(vm.shows, remoteData.pending);
			const selectShow = useCallback((showId: Option<number>) => appStore.selectShow(showId), []);

			return createElement(ShowsList, { shows, selectShow });
		}),
);
