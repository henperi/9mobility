import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { WelcomePage } from '../pages/OnboardingPage';

export function Routes() {
  return (
    <BrowserRouter>
      {/* <Toaster /> */}
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/welcome" />} />
        <Route exact path="/welcome" component={WelcomePage} />
        {/* 
          <ProtectedRoute exact path="/profile" component={Profile} /> 
        */}
      </Switch>
    </BrowserRouter>
  );
}
