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
					{option.isNone(props.selectedShowId) ? (
						<Fragment>
							<div className={css.controllers}>
								<SearchContainer />
								<GenreSelectorContainer />
							</div>
							<ShowsListContainer />
						</Fragment>
					) : (
						// TODO:
						// 1. use router
						// 2. change search algorithm:
						// - search in app store, then, if there is no the show, call show endpoint
						<ShowDetailsContainer />
					)}
				</div>
			);
		}),
);
