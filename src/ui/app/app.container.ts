import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { App } from './app.component';
import { newShowsService } from '../../services/shows.service';
import { newAppStore } from '../store/app.store';
import { useSink } from '../../utils/use-sink';

export const AppContainer = context.combine(
	context.defer(App, 'showsService', 'appStore'),
	newShowsService,
	newAppStore,
	(getAppComponent, newShowsService, newAppStore) =>
		memo(() => {
			const service = useSink(() => newShowsService(), []);
			const store = useMemo(() => newAppStore(), []);
			const AppComponent = useSink(() => getAppComponent({ showsService: service, appStore: store }), []);

			return createElement(AppComponent);
		}),
);
