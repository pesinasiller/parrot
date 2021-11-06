import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import useToken from './utils/useToken';

function App() {
  const { accessToken, setAccessToken } = useToken();
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login setToken={setAccessToken} />
            )}
          />
          <Route path="/home" component={()=><div>test</div>} exact />
          <PrivateRoute
            path="/"
            component={() => (
              <Home />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
