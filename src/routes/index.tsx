import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConfirmNumber } from '../pages/OnboardingPage/ConfirmNumber';
import { ConfirmOTP } from '../pages/OnboardingPage/ConfirmOTP';
import { Register } from '../pages/OnboardingPage/Register';
import { RegisterationComplete } from '../pages/OnboardingPage/RegisterationComplete';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../pages/Dashboard';
import { AirtimePage } from '../pages/Airtime';
import { BuyWithPin } from '../pages/Airtime/BuyWithPin';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/onboarding" />} />
      <Route
        exact
        path="/onboarding"
        render={() => <Redirect to="/onboarding/confirmNumber" />}
      />
      <Route exact path="/onboarding/confirmNumber" component={ConfirmNumber} />
      <Route exact path="/onboarding/verifyOTP" component={ConfirmOTP} />
      <Route exact path="/onboarding/register" component={Register} />
      <Route
        exact
        path="/onboarding/successful"
        component={RegisterationComplete}
      />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/airtime" component={AirtimePage} />
      <ProtectedRoute
        exact
        path="/airtime/buy-with-pin"
        component={BuyWithPin}
      />
    </Switch>
  );
};
