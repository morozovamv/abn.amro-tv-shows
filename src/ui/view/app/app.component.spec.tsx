import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './app.component';
import { APP_STORE_MOCK } from '../../store/app.store.mock';
import { SHOWS_SERVICE_MOCK } from '../../../services/shows.service.mock';
import { option } from 'fp-ts';
import { SEARCH_REPOSITORY_MOCK } from '../../../data/search/search.repository.mock';

const appSink = App({
	appStore: APP_STORE_MOCK,
	showsService: SHOWS_SERVICE_MOCK,
	searchRepository: SEARCH_REPOSITORY_MOCK,
});
appSink.effects.subscribe();
const AppComponent = appSink.value;

test('renders title', () => {
	render(<AppComponent selectedShowId={option.none} />);
	const mainTitle = screen.getByText(/abn.amro TA/i);
	expect(mainTitle).toBeInTheDocument();
});
