import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/rootReducer';
import paths from '../../services/utils/paths';

interface ProtectedRouteProps {
  children: any;
  path: string;
}

export function ProtectedRoute({ children, ...rest }: ProtectedRouteProps) {
  const { user } = useSelector((store: RootState) => ({
    user: store.user,
  }));

  const isEmptyUser = Object.keys(user).length === 0;
  const { login } = paths;

  return (
    <Route
      {...rest}
      render={() => (!isEmptyUser ? children : <Redirect to={`${login}`} />)}
      exact={true}
    />
  );
}
