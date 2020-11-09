import { RemoteData } from '@devexperts/remote-data-ts';
import { Option } from 'fp-ts/lib/Option';
import React, { memo } from 'react';
import { ShowModel } from '../../../domain/show.model';
import { pipe } from 'fp-ts/lib/function';
import { option } from 'fp-ts';
import css from './show-details.module.css';
import { RenderRemoteData } from '../ui-kit/render-remote-data.component';

interface ShowDetailsProps {
	show: RemoteData<Error, Option<ShowModel>>;
	goBackToShows: () => void;
}

export const ShowDetails = memo((props: ShowDetailsProps) => {
	return (
		<div>
			<button className={css.button} onClick={props.goBackToShows}>
				&larr; Back
			</button>
			<RenderRemoteData
				data={props.show}
				success={(show) =>
					pipe(
						show,
						option.fold(
							() => <div>No show data</div>,
							(show) => (
								<div>
									<h2 className={css.title}>{show.name}</h2>
									<div>
										{show.genres.map((genre, index) => (
											<span key={genre}>
												{index === show.genres.length - 1 ? genre : genre + ', '}
											</span>
										))}
									</div>
									<img src={show.image.medium} alt={show.name} />
									{show.summary !== null && (
										<div dangerouslySetInnerHTML={{ __html: show.summary }} />
									)}
								</div>
							),
						),
					)
				}
				failure={(error) => {
					console.error(error);
					return <div>{error.message}</div>;
				}}
			/>
		</div>
	);
});
