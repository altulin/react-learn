import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/rootReducer';
import paths from '../../services/utils/paths';
import stylesText from '../app/App.module.css';

interface ProtectedRouteProps {
  children: any;
  path: string;
  auth?: boolean;
}

export function ProtectedRoute({
  auth,
  children,
  ...rest
}: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user);

  const { isAuthChecked, data } = user;

  const { login, main } = paths;
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <h1 className={`${stylesText.preload_text} text text_type_main-large`}>
        Загружаем ...
      </h1>
    );
  }

  if (!auth && !data) {
    return (
      <Route {...rest} exact>
        <Redirect to={{ pathname: `${login}`, state: { from: location } }} />
      </Route>
    );
  }

  if (auth && data) {
    const { from } = (location.state as any) || {
      from: { pathname: `${main}` },
    };

    return (
      <Route {...rest} exact>
        <Redirect to={from} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}
