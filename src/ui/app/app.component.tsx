import { context } from '@devexperts/rx-utils/dist/context2.utils';
import React, { memo } from 'react';
import { GenreSelectorContainer } from '../view/genre-selector/genre-selector.container';
import { ShowsListContainer } from '../view/shows-list/shows-list.container';

export const App = context.combine(
	ShowsListContainer,
	GenreSelectorContainer,
	(ShowsListContainer, GenreSelectorContainer) =>
		memo(() => {
			return (
				<div>
					<h1>ABN.AMRO TA</h1>
					<GenreSelectorContainer />
					<ShowsListContainer />
				</div>
			);
		}),
);
