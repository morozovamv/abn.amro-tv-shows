import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { App } from './app.component';
import { newShowsService } from '../../../services/shows.service';
import { newAppStore } from '../../store/app.store';
import { useSink } from '../../../utils/use-sink.utils';
import { useBehaviorSubject } from '../../../utils/use-behavior-subject.utils';

export const AppContainer = context.combine(
	context.defer(App, 'showsService', 'appStore'),
	newShowsService,
	newAppStore,
	(getAppComponent, newShowsService, newAppStore) =>
		memo(() => {
			const service = useSink(() => newShowsService(), []);
			const store = useMemo(() => newAppStore(), []);
			const AppComponent = useSink(() => getAppComponent({ showsService: service, appStore: store }), []);
			const selectedShowId = useBehaviorSubject(store.selectedShowId);

			return createElement(AppComponent, { selectedShowId });
		}),
);
