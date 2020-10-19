import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { Button } from '../Button';

interface Props {
  onSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => void;
  onFailure: (response: any) => void;
}

export const GoogleSocialLogin: React.FC<Props> = (props) => {
  const { onSuccess, onFailure } = props;

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
      render={(renderProps) => (
        <Button
          border
          elevated={false}
          isLoading={renderProps.disabled}
          onClick={renderProps.onClick}
          rounded
          variant="default"
          fullWidth
        >
          Sign up with google
        </Button>
      )}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};
