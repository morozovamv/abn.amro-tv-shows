import * as remoteData from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { option } from 'fp-ts';
import { createElement, memo, useMemo } from 'react';
import { useObservable } from '../../../utils/use-observable';
import { AppStore } from '../../store/app.store';
import { ShowDetails } from './show-details.component';
import { newShowDetailsViewModel } from './show-details.view-model';

export const ShowDetailsContainer = context.combine(
	newShowDetailsViewModel,
	context.key<AppStore>()('appStore'),
	(newShowDetailsViewModel, appStore) =>
		memo(() => {
			const vm = useMemo(() => newShowDetailsViewModel(), []);

			const show = useObservable(vm.show, remoteData.pending);
			const goBackToShows = () => appStore.selectShow(option.none);

			return createElement(ShowDetails, {
				show,
				goBackToShows,
			});
		}),
);
