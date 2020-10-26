import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalStore } from '../../store';

export const ProtectedRoute: React.FC<any> = ({
  component: Component,
  ...rest
}) => {
  const {
    state: { auth },
  } = useGlobalStore();

  const isRegistered = !!auth.user?.firstName && !!auth.user.lastName;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated && isRegistered) {
          return <Component {...props} />;
        }
        if (auth.isAuthenticated && !isRegistered) {
          return <Redirect to="/onboarding/register" />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};
