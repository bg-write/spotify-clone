import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Pull our auth code info from our URL into an object that we'll use in our Dashboard. And if we have a code in our URL, we want to render our Dashboard and pass along that code; otherwise, we want to render our Login.
const code = new URLSearchParams(window.location.search).get('code');

function App() {
	return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
