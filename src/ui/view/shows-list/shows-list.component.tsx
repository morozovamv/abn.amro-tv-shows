import React, { Fragment, memo } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';
import { ShowModel } from '../../../domain/show.model';
import css from './show-list.module.css';
import { RenderRemoteData } from '../ui-kit/render-remote-data.component';

interface ShowsListProps {
	readonly shows: RemoteData<Error, Array<ShowModel>>;
	readonly selectShow: (showId: Option<number>) => void;
}

export const ShowsList = memo((props: ShowsListProps) => {
	return (
		<div className={css.container}>
			<RenderRemoteData
				data={props.shows}
				success={(shows) => (
					<Fragment>
						{shows.map((show) => (
							<div
								className={css.imageContainer}
								key={show.id}
								onClick={() => props.selectShow(option.some(show.id))}>
								<img className={css.image} src={show.image.medium} alt={show.name} />
							</div>
						))}
					</Fragment>
				)}
			/>
		</div>
	);
});
