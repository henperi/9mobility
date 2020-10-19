import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FacebookProvider, Login } from 'react-facebook';
import { Button } from '../Button';

interface SuccessResp {
  eventKey: string;
  profile: {
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    name: string;
    name_format: string;
    short_name: string;
    picture: {
      data: {
        height: number;
        width: number;
        is_silhouette: boolean;
        url: string;
      };
    };
  };
  tokenDetail: {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    graphDomain: string;
    signedRequest: string;
    userID: number;
  };
}

interface Props {
  onSuccess: (response: SuccessResp) => void;
  onFailure: (response: any) => void;
}

export const FacebookLogin: React.FC<Props> = (props) => {
  const { onSuccess, onFailure } = props;

  return (
    <FacebookProvider appId={process.env.REACT_APP_FB_APP_ID || ''}>
      <Login scope="email" onCompleted={onSuccess} onError={onFailure}>
        {({ loading, handleClick }: any) => (
          <Button
            border
            elevated={false}
            isLoading={loading}
            onClick={handleClick}
            rounded
            variant="default"
            fullWidth
          >
            Sign up with facebook
          </Button>
        )}
      </Login>
    </FacebookProvider>
  );
};
