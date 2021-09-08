import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
	background-image: url('https://media.giphy.com/media/KZFrf9JusXzmpnPsT6/giphy.gif');
	font-family: sans-serif, Helvetica Neue, Helvetica, Arial;
}
`;

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
