import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Card } from '../Card';
import { getFieldError } from '../../utils/formikHelper';
import { Column } from '../Column';
import { Text } from '../Text';
import { SizedBox } from '../SizedBox';
import { usePost } from '../../customHooks/useRequests';
import { TextField } from '../TextField';
import { ErrorBox } from '../ErrorBox';
import { Button } from '../Button';

export interface OtpVerificationResponse {
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

export const ConfirmOTPScreen: React.FC<{
  message: string;
  trackingId: string;
  mobileNumber: string;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const { message, mobileNumber, trackingId, setShowComponent } = props;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const [verifyOTP] = usePost<OtpVerificationResponse>(
    'Mobility.Onboarding/api/Verification/verifyotp',
  );

  const handleVerifyOTP = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');

      await verifyOTP({ ...data, trackingId, mobileNumber });
      setShowComponent(true);
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

  return (
    <Column>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <form onSubmit={formik.handleSubmit}>
        <Card
          fullWidth
          fullHeight
          padding="40px"
          style={{ minHeight: '300px' }}
        >
          <Column
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={5}
            style={{ margin: '0 auto' }}
          >
            <SizedBox height={20} />
            <Text size={18} weight={700} alignment="center">
              {message}
            </Text>
            <SizedBox height={6} />
            <Text weight={300} alignment="center">
              To access this page, kindly enter the OPT sent to your registered
              number
            </Text>
            <SizedBox height={36} />
            <TextField
              placeholder="Enter OTP"
              onChange={(e) => formik.setFieldValue('otp', e.target.value)}
              error={getFieldError(formik.errors.otp, formik.touched.otp)}
            />
            <SizedBox height={36} />
            <Button type="submit" isLoading={loading} fullWidth>
              Continue
            </Button>
          </Column>
        </Card>
      </form>
    </Column>
  );
};
