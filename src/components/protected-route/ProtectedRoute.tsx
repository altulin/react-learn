import { Route } from 'react-router-dom';

interface ProtectedRouteProps {
  children: any;
}

export function ProtectedRoute({ children, ...rest }: ProtectedRouteProps) {
  return <Route {...rest} render={() => children}></Route>;
}
