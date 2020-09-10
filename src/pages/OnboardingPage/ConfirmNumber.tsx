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
import { usePost } from '../../customHooks/useRequests';
import { getFieldError } from '../../utils/formikHelper';
import { logger } from '../../utils/logger';
import { ErrorBox } from '../../components/ErrorBox';
import { SetScreen } from '.';

interface Response {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

interface Error {
  message: string;
  responseCode: number;
}

export const ConfirmNumber: React.FC<SetScreen> = () => {
  const [verifyNumber] = usePost<Response>(
    'Mobility.Onboarding/api/Verification/initiateverification',
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const history = useHistory();

  const handleVerifyNumber = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const result = await verifyNumber(data);
      setLoading(false);

      history.push(
        `/onboarding/verifyOTP?mobileNumber=${data.MobileNumber}&trackingId=${result.data.result.trackingId}`,
      );

      logger.log(result.data);
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      MobileNumber: '',
    },
    validationSchema: Yup.object({
      MobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
    }),
    onSubmit: (values) => {
      handleVerifyNumber(values);
    },
  });

  return (
    <PageBody centeralize>
      <Column xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card showOverlayedDesign fullWidth>
          <Column>
            <Text variant="darker" size={32}>
              Welcome
            </Text>
            <SizedBox height={4} />
            <Text variant="lighter">
              You’ll get an sms to confirm your number
            </Text>
            <SizedBox height={78} />
            {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Phone Number"
                leftIcon="+234"
                placeholder="Enter phone number"
                {...formik.getFieldProps('MobileNumber')}
                type="tel"
                minLength={11}
                maxLength={11}
                required
                title="must be a valid phone number starting with 0 eg 08112322124"
                error={getFieldError(
                  formik.errors.MobileNumber,
                  formik.touched.MobileNumber,
                )}
              />
              <SizedBox height={60} />
              <Button
                isLoading={loading}
                disabled={formik.touched && !formik.isValid}
                type="submit"
                fullWidth
              >
                Continue
              </Button>
            </form>
            <SizedBox height={100} />
          </Column>
        </Card>
      </Column>
    </PageBody>
  );
};
