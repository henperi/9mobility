import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Card } from '../Card';
import { Column } from '../Column';
import { Text } from '../Text';

import { SizedBox } from '../SizedBox';
import { ErrorBox } from '../ErrorBox';
import { Button } from '../Button';
import { useLazyFetch } from '../../customHooks/useRequests';
import { logger } from '../../utils/logger';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { ConfirmOTPScreen } from './ConfirmOTP';
import { PageBody } from '../PageBody';
import { Styles as CardStyles } from '../Card/styles';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Colors } from '../../themes/colors';

interface VerifyNumberResponse {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

interface ScreenToShow {
  trackingId: string;
}

export const ValidateOTP: React.FC<{
  screen: React.FC<ScreenToShow>;
  title: string;
  subtitle: string;
}> = (props) => {
  const { screen: Component, title, subtitle } = props;

  const [requestOTP, { loading, data, error }] = useLazyFetch<
    VerifyNumberResponse
  >('Mobility.Onboarding/api/Verification/initiateinappotp');

  const { mobileNumbers } = useGetMobileNumbers();
  const [showOTPScreen, setshowOTPScreen] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

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

  const renderPageBody = () => {
    if (showComponent && data) {
      return <Component trackingId={data?.result.trackingId} />;
    }

    if (showOTPScreen && data && mobileNumbers) {
      return (
        <ConfirmOTPScreen
          message={data?.message}
          setShowComponent={setShowComponent}
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

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <SizedBox height={10} />
          <Text size={32} weight={500}>
            {title}
          </Text>
          <SizedBox height={5} />
          <Text weight={500} color={Colors.grey}>
            {subtitle}
          </Text>
          <SizedBox height={30} />
        </Column>
      </CardStyles.CardHeader>

      <SizedBox height={40} />

      {renderPageBody()}
    </PageBody>
  );
};
