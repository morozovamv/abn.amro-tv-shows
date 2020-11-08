import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { newSearchRepository } from '../../data/search/search.repository';
import { newShowsRepository } from '../../data/shows/shows.repository';
import { useSink } from '../../utils/use-sink';
import { Bootstrap } from './bootstrap.component';

export const BootstrapContainer = context.combine(
	context.defer(Bootstrap, 'showsRepository', 'searchRepository'),
	newShowsRepository,
	newSearchRepository,
	(getBootstrap, newShowsRepository, newSearchRepository) =>
		memo(() => {
			const showsRepository = useSink(() => newShowsRepository(), []);
			const searchRepository = useMemo(() => newSearchRepository(), []);
			const BootstrapComponent = useSink(() => getBootstrap({ showsRepository, searchRepository }), [
				showsRepository,
				searchRepository,
			]);

			return createElement(BootstrapComponent);
		}),
);
