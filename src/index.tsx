import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BootstrapContainer } from './ui/bootstrap/bootstrap.container';
import { useSink } from './utils/use-sink';
import './index.css';

const env = {};

const Index = memo(() => {
	const Bootstrap = useSink(() => BootstrapContainer(env), [BootstrapContainer]);

	return <Bootstrap />;
});

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
