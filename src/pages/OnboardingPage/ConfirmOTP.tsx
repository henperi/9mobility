import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';

import { useUrlQuery } from '../../customHooks/useUrlQuery';
import { usePost } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { getFieldError } from '../../utils/formikHelper';
import { useGlobalStore } from '../../store';
import { setAuthUser } from '../../store/modules/auth/actions';
import { SetScreen } from '.';
import { ResendOTPIn } from '../../components/ResendOTP';

export interface OnboardingAuthResponse {
  result: {
    expiresIn: Date;
    accesssToken: string;
    firstName: string;
    lastName: string;
    email: string;
    hasWallet: boolean;
    walletAccount: string;
    refreshToken: string;
  };
  responseCode: number;
  message: string;
}

export const ConfirmOTP: React.FC<SetScreen> = () => {
  const query = useUrlQuery();
  const mobileNumber = query.get('mobileNumber');
  const trackingId = query.get('trackingId');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const history = useHistory();
  const { dispatch } = useGlobalStore();

  const [verifyOTP] = usePost<OnboardingAuthResponse>(
    'Mobility.Onboarding/api/Verification/verifyotp',
  );

  const handleVerifyOTP = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const result = await verifyOTP({ ...data, trackingId, mobileNumber });
      setLoading(false);
      dispatch(setAuthUser(result.data.result));

      // logger.log(result.data);
      const { email, firstName } = result.data.result;

      if (email || firstName) {
        history.push(`/dashboard`);
      } else history.push(`/onboarding/register`);
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .min(4, 'Must be a 4 digit code')
        .max(4, 'Must be a 4 digit code')
        .required('This field is required'),
    }),
    onSubmit: (values) => {
      handleVerifyOTP(values);
    },
  });

  const { onChange, ...formikProps } = formik.getFieldProps('otp');

  return (
    <PageBody centeralize>
      <Column xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card showOverlayedDesign fullWidth padding="7% 12%">
          <Column>
            <Text variant="darker" size={32}>
              OTP
            </Text>
            <SizedBox height={4} />
            <Text variant="lighter">
              Enter code sent via sms to {mobileNumber}
            </Text>
            <SizedBox height={78} />

            {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: 'contents',
              }}
            >
              <TextField
                label="OTP"
                multiUnits
                numberOfUnits={4}
                containerStyle={{
                  display: 'flex',
                  alignSelf: 'center',
                }}
                type="number"
                required
                onChange={(e) => formik.setFieldValue('otp', e.target.value)}
                error={getFieldError(formik.errors.otp, formik.touched.otp)}
                {...formikProps}
              />
              <SizedBox height={60} />
              <Button type="submit" isLoading={loading} fullWidth>
                Continue
              </Button>
            </form>
            <SizedBox height={32} />
            <ResendOTPIn time={40} trackingId={trackingId} />
            <SizedBox height={52} />
          </Column>
        </Card>
      </Column>
    </PageBody>
  );
};
