import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Card } from '../../components/Card';
import { getFieldError } from '../../utils/formikHelper';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { SizedBox } from '../../components/SizedBox';
import { usePost } from '../../customHooks/useRequests';
import { TextField } from '../../components/TextField';
import { ErrorBox } from '../../components/ErrorBox';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

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

export const ConfirmOTP: React.FC<{
  message: string;
  trackingId: string;
  mobileNumber: string;
  setshowOTPScreen: React.Dispatch<React.SetStateAction<boolean>>;
  callbackFunction: () => Promise<void>;
}> = (props) => {
  const {
    message,
    mobileNumber,
    trackingId,
    setshowOTPScreen,
    callbackFunction,
  } = props;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const [verifyOTP] = usePost<OtpVerificationResponse>(
    'Mobility.Onboarding/api/Verification/verifyotp',
  );

  const handleVerifyOTP = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const result = await verifyOTP({ ...data, trackingId, mobileNumber });
      if (result.data.responseCode === 1) {
        setshowOTPScreen(false);
        callbackFunction();
      }
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
    <Modal isVisible onClose={() => setshowOTPScreen(false)} size="sm">
      <Column>
        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
        <form onSubmit={formik.handleSubmit}>
          <Card
            fullWidth
            fullHeight
            padding="40px"
            style={{ minHeight: '300px' }}
          >
            <Column xs={12} style={{ margin: '0 auto' }}>
              <SizedBox height={20} />
              <Text size={18} weight={700} alignment="center">
                {message}
              </Text>
              <SizedBox height={6} />
              <Text weight={300} alignment="center">
                Kindly enter the OPT sent to your registered number
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
    </Modal>
  );
};
