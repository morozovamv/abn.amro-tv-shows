import { context } from '@devexperts/rx-utils/dist/context2.utils';
import React, { Fragment, memo } from 'react';
import { GenreSelectorContainer } from '../genre-selector/genre-selector.container';
import { ShowsListContainer } from '../shows-list/shows-list.container';
import { ShowDetailsContainer } from '../show-details/show-details.container';
import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';
import css from './app.module.css';
import { SearchContainer } from '../search/search.container';

interface AppProps {
	readonly selectedShowId: Option<number>;
}

export const App = context.combine(
	ShowsListContainer,
	GenreSelectorContainer,
	ShowDetailsContainer,
	SearchContainer,
	(ShowsListContainer, GenreSelectorContainer, ShowDetailsContainer, SearchContainer) =>
		memo((props: AppProps) => {
			return (
				<div className={css.container}>
					<h1 className={css.title}>ABN.AMRO TA</h1>
					<SearchContainer />
					{option.isNone(props.selectedShowId) ? (
						<Fragment>
							<GenreSelectorContainer />
							<ShowsListContainer />
						</Fragment>
					) : (
						// TODO: use router
						<ShowDetailsContainer />
					)}
				</div>
			);
		}),
);
