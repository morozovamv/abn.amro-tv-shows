import React, { memo } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';

type Show = {
	id: number;
	name: string;
};

interface ShowsListProps {
	readonly shows: RemoteData<Error, Array<Show>>;
	readonly selectShow: (showId: Option<number>) => void;
}

export const ShowsList = memo((props: ShowsListProps) => {
	return (
		<div>
			<h2>Shows list</h2>
			{/* TODO: implement renderer for remote data */}
			{remoteData.isSuccess(props.shows)
				? props.shows.value.map((show) => (
						<div key={show.id} onClick={() => props.selectShow(option.some(show.id))}>
							<span>show: </span>
							<span>{show.name}</span>
						</div>
				  ))
				: 'loading...'}
		</div>
	);
});
