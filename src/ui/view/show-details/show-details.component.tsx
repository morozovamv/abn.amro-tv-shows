import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import { Option } from 'fp-ts/lib/Option';
import React, { memo } from 'react';
import { ShowModel } from '../../../domain/show.model';
import { pipe } from 'fp-ts/lib/function';
import { option } from 'fp-ts';

interface ShowDetailsProps {
	show: RemoteData<Error, Option<ShowModel>>;
	goBackToShows: () => void;
}

export const ShowDetails = memo((props: ShowDetailsProps) => {
	return (
		<div>
			<button onClick={props.goBackToShows}>&larr; Back</button>
			{pipe(
				props.show,
				remoteData.fold(
					() => <div></div>,
					() => <div>'loading ...'</div>,
					(error) => {
						console.error(error);
						return <div>{error.message}</div>;
					},
					(show) =>
						pipe(
							show,
							option.fold(
								() => <div>No show data</div>,
								(show) => (
									<div>
										<div>{show.name}</div>
										<div>{show.genres}</div>
										<img src={show.image.medium} alt={show.name} />
										<div dangerouslySetInnerHTML={{ __html: show.summary }} />
									</div>
								),
							),
						),
				),
			)}
		</div>
	);
});
