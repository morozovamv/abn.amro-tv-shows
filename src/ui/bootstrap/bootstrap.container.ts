import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo } from 'react';
import { newShowsRepository } from '../../data/shows.repository';
import { useSink } from '../../utils/use-sink';
import { Bootstrap } from './bootstrap.component';

export const BootstrapContainer = context.combine(
	context.defer(Bootstrap, 'showsRepository'),
	newShowsRepository,
	(getBootstrap, newShowsRepository) =>
		memo(() => {
			const showsRepository = useSink(() => newShowsRepository(), []);
			const BootstrapComponent = useSink(() => getBootstrap({ showsRepository }), [showsRepository]);

			return createElement(BootstrapComponent);
		}),
);
