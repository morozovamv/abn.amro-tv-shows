import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import React, { memo } from 'react';
import { SearchModel } from '../../../domain/search.model';
import { pipe } from 'fp-ts/lib/pipeable';

interface SearchProps {
	readonly shows: RemoteData<Error, SearchModel>;
	readonly query: string;
	readonly onQueryChange: (value: string) => void;
	readonly onSearch: (query: string) => void;
}

export const Search = memo((props: SearchProps) => {
	return (
		<div>
			<input type="text" value={props.query} onChange={(e) => props.onQueryChange(e.target.value)} />
			<button onClick={() => props.onSearch(props.query)}>search</button>
			<div>
				{pipe(
					props.shows,
					remoteData.fold(
						() => <div></div>,
						() => <div>loading ...</div>,
						(error) => {
							console.error(error);
							return <div>{error.message}</div>;
						},
						(shows) => (
							<div>
								{shows.map((show) => (
									<div key={show.id}>{show.name}</div>
								))}
							</div>
						),
					),
				)}
			</div>
		</div>
	);
});
