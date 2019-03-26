import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const msp = state => {
  return { loggedIn: Boolean(state.session.id) };
};

const Auth = ({ component: Component, path, loggedIn, exact, history }) => {
  if (!loggedIn) {
    return (
      <Route path={path} exact={exact} render={(props) => (
        <Component {...props} />
      )} />
    );
  } else {
    history.goBack();
    return (
      <>
        {null}
      </>
    );
  }
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));

const Protected = ({ component: Component, path, loggedIn, exact, history }) => {
  if (loggedIn) {
    return (
      <Route path={path} exact={exact} render={(props) => (
        <Component {...props} />
      )} />
    );
  } else {
    history.push(path);
    return (
      <Route path={path} exact={exact} render={(props) => (
        <Redirect to="/session/new" />
      )} />
    );
  }
};

export const ProtectedRoute = withRouter(connect(msp, null)(Protected));
