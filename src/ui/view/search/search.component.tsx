import { RemoteData } from '@devexperts/remote-data-ts';
import React, { memo } from 'react';
import { SearchModel } from '../../../domain/search.model';
import css from './search.module.css';
import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';
import { RenderRemoteData } from '../ui-kit/render-remote-data.component';

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
			<RenderRemoteData
				className={css.list}
				data={props.shows}
				success={(shows) => (
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
				)}
				failure={(error) => {
					console.error(error);
					return <div className={css.list}>{error.message}</div>;
				}}
			/>
		</div>
	);
});
