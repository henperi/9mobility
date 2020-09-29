import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';

import { SizedBox } from '../../components/SizedBox';
import { ErrorBox } from '../../components/ErrorBox';
import { Button } from '../../components/Button';
import { useLazyFetch } from '../../customHooks/useRequests';
import { logger } from '../../utils/logger';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { CallHistoryTable } from './CallHistoryTable';
import { CallHistoryConfirmOTP } from './CallHistoryConfirmOTP';

interface VerifyNumberResponse {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

export const CallHistoryNumberCheck: React.FC = () => {
  const [requestOTP, { loading, data, error }] = useLazyFetch<
    VerifyNumberResponse
  >('Mobility.Onboarding/api/Verification/initiateinappotp');

  const { mobileNumbers } = useGetMobileNumbers();
  const [showOTPScreen, setshowOTPScreen] = useState(false);
  const [showCallHistoryScreen, setshowCallHistoryScreen] = useState(false);

  useEffect(() => {
    if (data?.result?.trackingId) {
      setshowOTPScreen(true);
    }
  }, [data]);

  const getOTP = async () => {
    try {
      await requestOTP();
    } catch (err) {
      logger.log(err);
    }
  };

  if (showCallHistoryScreen && data) {
    return <CallHistoryTable trackingId={data?.result.trackingId || 'aas'} />;
  }

  if (showOTPScreen && data && mobileNumbers) {
    return (
      <CallHistoryConfirmOTP
        message={data?.message}
        setshowCallHistoryScreen={setshowCallHistoryScreen}
        trackingId={data.result.trackingId}
        mobileNumber={mobileNumbers[0].value}
      />
    );
  }

  return (
    <Column>
      {error && <ErrorBox>{error?.message}</ErrorBox>}
      <Card fullWidth fullHeight padding="40px">
        <Column
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={5}
          style={{ margin: '0 auto' }}
        >
          <Text size={18} alignment="center">
            You need an OTP to access this page
          </Text>
          <SizedBox height={36} />
          <Button
            type="submit"
            onClick={() => getOTP()}
            fullWidth
            isLoading={loading}
          >
            Generate OTP
          </Button>
        </Column>
      </Card>
    </Column>
  );
};
