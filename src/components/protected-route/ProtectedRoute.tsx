import { Route, Redirect } from 'react-router-dom';
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
  // const { user } = useSelector((store: RootState) => ({
  //   user: store.user,
  // }));

  const user = useSelector((state: RootState) => state.user);

  const { isAuthChecked, data } = user;

  // const isEmptyUser = Object.keys(user).length === 0;
  const { login, main } = paths;

  // return (
  //   // <Route>

  //   // </Route>
  //   <Route
  //     {...rest}
  //     render={() => (!isEmptyUser ? children : <Redirect to={`${login}`} />)}
  //     exact={true}
  //   />
  // );

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
        <Redirect to={`${login}`} />
      </Route>
    );
  }

  if (auth && data) {
    return (
      <Route {...rest} exact>
        <Redirect to={`${main}`} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}
