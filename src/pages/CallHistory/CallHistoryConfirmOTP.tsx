import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { useUrlQuery } from '../../customHooks/useUrlQuery';
import { getFieldError } from '../../utils/formikHelper';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { SizedBox } from '../../components/SizedBox';
import { usePost } from '../../customHooks/useRequests';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';




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

export const CallHistoryConfirmOTP: React.FC = () => {
  const history = useHistory();
  const query = useUrlQuery();
  const mobileNumber = query.get('mobileNumber');
  const trackingId = query.get('trackingId');

  const [verifyOTP] = usePost<OtpVerificationResponse>(
    'Mobility.Onboarding/api/Verification/verifyotp',
  );

  const handleVerifyOTP = async (data: typeof formik.values) => {
    try {
      // setLoading(true);
      // setErrorMessage('');

      const result = await verifyOTP({ ...data, trackingId, mobileNumber });
      console.log(result.data.result, 'this is the bitch right here')
       
      // setLoading(false);
      // dispatch(setAuthUser(result.data.result));

      const { email, firstName } = result.data.result;

      if (email || firstName)  history.push(`/call/history?trackingId=${trackingId}`)
    } catch (error) {
      // setLoading(false);
      // setErrorMessage((error as Error).message);
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
                We sent you an SMS with a code
              </Text>
              <SizedBox height={6} />
              <Text weight={300} alignment="center">
                To access your call history, kindly enter the OPT sent to your
                registered number
              </Text>
              <SizedBox height={36} />
              <TextField 
                placeholder="Enter OTP"
                onChange={(e) => formik.setFieldValue('otp', e.target.value)}
                error={getFieldError(formik.errors.otp, formik.touched.otp)}
              />
              <SizedBox height={36} />
              <Button type="submit" fullWidth>
                Continue
              </Button>
            </Column>
          </Card>
        </form>
      </Column>
  );
};