import React, { memo } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';

interface GenreSelectorProps {
	readonly genres: RemoteData<Error, Array<string>>;
	readonly selectedGenre: string;
	readonly setSelectedGenre: (genre: string) => void;
}

export const GenreSelector = memo((props: GenreSelectorProps) => {
	// TODO: setSelectedGenre to useCallback
	return (
		<div>
			<h2>Genres</h2>
			{remoteData.isSuccess(props.genres) ? (
				<select
					name="genres"
					id="genres"
					value={props.selectedGenre}
					onChange={(e) => props.setSelectedGenre(e.target.value)}>
					<option defaultValue={'all'} id={'all'} value={'all'}>
						All genres
					</option>
					{props.genres.value.map((genre) => (
						<option key={genre} value={genre} id={genre}>
							{genre}
						</option>
					))}
				</select>
			) : (
				'loading...'
			)}
		</div>
	);
});
