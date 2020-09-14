import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { ConfirmNumber } from '../pages/OnboardingPage/ConfirmNumber';
import { ConfirmOTP } from '../pages/OnboardingPage/ConfirmOTP';
import { Register } from '../pages/OnboardingPage/Register';
import { RegisterationComplete } from '../pages/OnboardingPage/RegisterationComplete';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../pages/Dashboard';

export const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Toaster /> */}
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/onboarding" />} />
        <Route
          exact
          path="/onboarding"
          render={() => <Redirect to="/onboarding/confirmNumber" />}
        />
        <Route
          exact
          path="/onboarding/confirmNumber"
          component={ConfirmNumber}
        />
        <Route exact path="/onboarding/verifyOTP" component={ConfirmOTP} />
        <Route exact path="/onboarding/register" component={Register} />
        <Route
          exact
          path="/onboarding/successful"
          component={RegisterationComplete}
        />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};
