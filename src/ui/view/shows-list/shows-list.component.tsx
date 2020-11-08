import React, { memo } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';
import { ShowModel } from '../../../domain/show.model';
import css from './show-list.module.css';

interface ShowsListProps {
	readonly shows: RemoteData<Error, Array<ShowModel>>;
	readonly selectShow: (showId: Option<number>) => void;
}

export const ShowsList = memo((props: ShowsListProps) => {
	return (
		<div className={css.container}>
			{/* TODO: implement renderer for remote data */}
			{remoteData.isSuccess(props.shows)
				? props.shows.value.map((show) => (
						<div key={show.id} onClick={() => props.selectShow(option.some(show.id))}>
							<img className={css.image} src={show.image.medium} alt={show.name} />
						</div>
				  ))
				: 'loading...'}
		</div>
	);
});
