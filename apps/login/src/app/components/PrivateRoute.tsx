import { RootStateOrAny, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { authenticated } = useSelector((state: RootStateOrAny) => state);
  return (
  <Route
    {...rest}
    render={ props => (
      authenticated ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
    )}
  />
)};

export default PrivateRoute;
