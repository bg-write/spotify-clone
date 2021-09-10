import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';
import './index.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
	background-image: url('https://media.giphy.com/media/KZFrf9JusXzmpnPsT6/giphy.gif');
	font-family: Georgia, sans-serif, Helvetica Neue, Helvetica, Arial;
}
`;

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Router>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
