import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const token = Cookies.get('jwt_token')

  return (
    <Route
      {...rest}
      render={props =>
        token !== undefined ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute
