import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import React, { memo } from 'react';
import { SearchModel } from '../../../domain/search.model';
import { pipe } from 'fp-ts/lib/pipeable';
import css from './search.module.css';
import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';

interface SearchProps {
	readonly shows: RemoteData<Error, SearchModel>;
	readonly query: string;
	readonly onQueryChange: (value: string) => void;
	readonly onSearch: (query: string) => void;
	readonly selectShow: (showId: Option<number>) => void;
}

export const Search = memo((props: SearchProps) => {
	return (
		<div className={css.container}>
			<input
				className={css.input}
				type="text"
				value={props.query}
				onChange={(e) => props.onQueryChange(e.target.value)}
			/>
			<button className={css.button} onClick={() => props.onSearch(props.query)}>
				search
			</button>
			{/* TODO: for now it is impossible to close the list, implement click outside */}
			{pipe(
				props.shows,
				remoteData.fold(
					() => <div></div>,
					() => <div className={css.list}>loading ...</div>,
					(error) => {
						console.error(error);
						return <div className={css.list}>{error.message}</div>;
					},
					(shows) => (
						<div className={css.list}>
							{shows.map((show) => (
								<div
									className={css.item}
									key={show.id}
									onClick={() => props.selectShow(option.some(show.id))}>
									{show.name}
								</div>
							))}
						</div>
					),
				),
			)}
		</div>
	);
});
