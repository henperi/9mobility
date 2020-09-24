import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';
import { useFormik } from 'formik';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { getFieldError } from '../../utils/formikHelper';
import { usePost } from '../../customHooks/useRequests';
import { SizedBox } from '../../components/SizedBox';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';



interface VerifyNumberResponse {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

export const CallHistoryNumberCheck: React.FC = () => {
  const history = useHistory();
  // const { mobileNumbers } = useGetMobileNumbers();

  const [verifyNumber] = usePost<VerifyNumberResponse>(
    'Mobility.Onboarding/api/Verification/initiateverification',
  );

  const handleVerifyNumber = async (data: typeof formik.values) => {
    try {
      // setLoading(true);
      // setErrorMessage('');
      const result = await verifyNumber(data);
      // setLoading(false);
      console.log(result.data, 'this is result')
      history.push(
        `/call/confirm-opt?mobileNumber=${data.mobileNumber}&trackingId=${result.data.result.trackingId}`,
      );

      // logger.log(result.data);
    } catch (error) {
      // setLoading(false);
      // setErrorMessage((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
    }),
    onSubmit: async (data) => {
      handleVerifyNumber(data)
      // setShowConfirmationModal(true);
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
                 Get Opt
              </Text>
              <SizedBox height={36} />
              <TextField
                  label="Phone Number"
                  placeholder="Enter Phone number"
                  {...formik.getFieldProps('mobileNumber')}
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  error={getFieldError(
                    formik.errors.mobileNumber,
                    formik.touched.mobileNumber,
                  )}
                />
              <SizedBox height={36} />
              <Button type="submit" fullWidth>
                Generate OPT
              </Button>
            </Column>
          </Card>
        </form>
      </Column>
  );
};
