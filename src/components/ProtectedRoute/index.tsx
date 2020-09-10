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

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};
