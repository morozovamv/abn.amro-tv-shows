import * as remoteData from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { useObservable } from '../../../utils/use-observable.utils';
import { GenreSelector } from './genre-selector.component';
import { newGenreSelectorViewModel } from './genre-selector.view-model';

export const GenreSelectorContainer = context.combine(newGenreSelectorViewModel, (newGenreSelectorViewModel) =>
	memo(() => {
		const vm = useMemo(() => newGenreSelectorViewModel(), []);
		const genres = useObservable(vm.genres, remoteData.pending);
		const selectedGenre = useObservable(vm.selectedGenre, 'all');

		return createElement(GenreSelector, { genres, selectedGenre, setSelectedGenre: vm.setSelectedGenre });
	}),
);
