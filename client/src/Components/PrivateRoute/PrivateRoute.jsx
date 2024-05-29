import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/noaccess" />
      }
    />
  );
};

export default PrivateRoute;
