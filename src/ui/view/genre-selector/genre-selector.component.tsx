import React, { memo } from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import css from './genre-selector.module.css';
import { RenderRemoteData } from '../ui-kit/render-remote-data.component';

interface GenreSelectorProps {
	readonly genres: RemoteData<Error, Array<string>>;
	readonly selectedGenre: string;
	readonly setSelectedGenre: (genre: string) => void;
}

export const GenreSelector = memo((props: GenreSelectorProps) => {
	// TODO: setSelectedGenre to useCallback
	return (
		<div className={css.container}>
			<div className={css.title}>Genre:</div>
			<RenderRemoteData
				data={props.genres}
				success={(genres) => (
					<select
						className={css.select}
						name="genres"
						id="genres"
						value={props.selectedGenre}
						onChange={(e) => props.setSelectedGenre(e.target.value)}>
						<option defaultValue={'all'} id={'all'} value={'all'}>
							All genres
						</option>
						{genres.map((genre) => (
							<option key={genre} value={genre} id={genre}>
								{genre}
							</option>
						))}
					</select>
				)}
				className={css.loading}
			/>
		</div>
	);
});
