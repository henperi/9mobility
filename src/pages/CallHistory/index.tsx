import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';
import { useUrlQuery } from '../../customHooks/useUrlQuery';
import { getFieldError } from '../../utils/formikHelper';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { usePost } from '../../customHooks/useRequests';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { CallHistoryNumberCheck } from './CallHistoryNumberCheck';
import { CallHistoryConfirmOTP } from './CallHistoryConfirmOTP';
import { CallHistoryTable } from './CallHistoryTable';



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

export const CallHistory: React.FC = () => {
  const history = useHistory();
  const query = useUrlQuery();
  let { path, url } = useRouteMatch();
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
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <SizedBox height={10} />
          <Text size={32} weight={500}>
            Call History
          </Text>
          <SizedBox height={5} />
          <Text weight={500} color={Colors.grey}>
            Your airtime spending history
          </Text>
          <SizedBox height={30} />
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <div>
        <Route exact path={path} component={CallHistoryNumberCheck} />
        <Route path={`${path}/confirm-opt`} component={CallHistoryConfirmOTP} />
        <Route path={`${path}/history`} component={CallHistoryTable} />
      </div>
    </PageBody>
  );
};
