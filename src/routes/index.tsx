import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { ConfirmNumber } from '../pages/OnboardingPage/ConfirmNumber';
import { ConfirmOTP } from '../pages/OnboardingPage/ConfirmOTP';
import { Register } from '../pages/OnboardingPage/Register';

export const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Toaster /> */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/onboarding/confirmNumber" />}
        />
        <Route
          exact
          path="/onboarding/confirmNumber"
          component={ConfirmNumber}
        />
        <Route exact path="/onboarding/verifyOTP" component={ConfirmOTP} />
        <Route exact path="/onboarding/register" component={Register} />
        {/* 
          <ProtectedRoute exact path="/profile" component={Profile} /> 
        */}
      </Switch>
    </BrowserRouter>
  );
};
