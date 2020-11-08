import React, { memo } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';

type Show = {
	id: number;
	name: string;
};

interface ShowsListProps {
	readonly shows: RemoteData<Error, Array<Show>>;
}

export const ShowsList = memo((props: ShowsListProps) => {
	return (
		<div>
			<h2>Shows list</h2>
			{/* TODO: implement renderer for remote data */}
			{remoteData.isSuccess(props.shows)
				? props.shows.value.map((show) => (
						<div key={show.id}>
							<span>show: </span>
							<span>{show.name}</span>
						</div>
				  ))
				: 'loading...'}
		</div>
	);
});
