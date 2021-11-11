import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute({ children, logged, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => {
      return logged === true
        ? children
        : <Redirect to={{
          pathname: '/',
          state: { from: location }
        }} />
    }} />
  )
}

