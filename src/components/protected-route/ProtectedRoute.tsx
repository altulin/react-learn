import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from '../../index';
import paths from '../../services/utils/paths';
import { FC, ReactNode } from 'react';
import { TLocation } from '../app/App';
import Preload from '../preload/Preload';

interface IProtectedRoute {
  children: ReactNode;
  path: string;
  auth?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({
  auth,
  children,
  ...rest
}) => {
  const user = useSelector((state) => state.user);

  const { isAuthChecked, data } = user;

  const { login, main } = paths;
  const location: TProtectedRoute = useLocation();

  type TProtectedRoute = TLocation & {
    state: {
      from: {
        pathname: string;
      };
    };
  };

  if (!isAuthChecked) {
    <Preload />;
  }

  if (!auth && !data) {
    return (
      <Route {...rest} exact={true}>
        <Redirect to={{ pathname: `${login}`, state: { from: location } }} />
      </Route>
    );
  }

  if (auth && data) {
    const { from } = location.state || {
      from: { pathname: `${main}` },
    };

    return (
      <Route {...rest} exact={true}>
        <Redirect to={from} />
      </Route>
    );
  }

  return (
    <Route {...rest} exact={true}>
      {children}
    </Route>
  );
};
