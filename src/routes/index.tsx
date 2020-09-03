import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { SignupPage } from '../pages/SignupPage';

export function Routes() {
  return (
    <BrowserRouter>
      {/* <Toaster /> */}
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route exact path="/signup" component={SignupPage} />
        {/* 
          <ProtectedRoute exact path="/profile" component={Profile} /> 
        */}
      </Switch>
    </BrowserRouter>
  );
}
