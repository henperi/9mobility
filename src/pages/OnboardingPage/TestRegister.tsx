import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { GoogleLoginResponse } from 'react-google-login';

import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { SetScreen } from '.';
import { getFieldError } from '../../utils/formikHelper';
import { logger } from '../../utils/logger';
import { usePost } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { OnboardingAuthResponse } from './ConfirmOTP';
import { useGlobalStore } from '../../store';
import { setAuthUser } from '../../store/modules/auth/actions';
import { FacebookLogin } from '../../components/FacebookLogin';
import { GoogleSocialLogin } from '../../components/GoogleLogin';

export enum SignUpChannel {
  Mobile = 1,
  Web = 2,
}

export enum DataSourceEnum {
  Form = 1,
  Facebook = 2,
  Google = 3,
  NIL = 4,
}

export const RegisterTest: React.FC<SetScreen> = () => {
  const [registerUser] = usePost<OnboardingAuthResponse>(
    'Mobility.Onboarding/api/Onboarding/registeruser',
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const history = useHistory();
  const { dispatch } = useGlobalStore();

  const handleRegistration = async (data: typeof formik.values) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const result = await registerUser(data);
      setLoading(false);
      dispatch(setAuthUser(result.data.result));

      history.push(`/onboarding/successful`);

      logger.log(result.data);
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      channel: SignUpChannel.Web,
      dataSource: DataSourceEnum.Form,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('must be a valid email address')
        .required('This field is required'),
      firstName: Yup.string().required('This field is required'),
      lastName: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      logger.log(values);
      handleRegistration(values);
    },
  });

  // const { state } = useGlobalStore();
  // const isRegistered =
  //   !!state?.auth?.user?.firstName && !!state?.auth?.user.lastName;

  // useEffect(() => {
  //   if (state?.auth?.isAuthenticated) {
  //     if (isRegistered) {
  //       history.push('/dashboard');
  //     }
  //   } else {
  //     history.push('/');
  //   }
  // }, [history, state.auth, isRegistered]);

  return (
    <PageBody centeralize>
      <Column xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card showOverlayedDesign fullWidth padding="7% 12%">
          <Column>
            <Text variant="darker" size={32}>
              Almost done
            </Text>
            <SizedBox height={4} />
            <Text variant="lighter">
              We’d like to know a little more about you
            </Text>
            <SizedBox height={36} />

            {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Email"
                placeholder="Enter email"
                required
                error={getFieldError(formik.errors.email, formik.touched.email)}
                {...formik.getFieldProps('email')}
              />
              <SizedBox height={16} />
              <TextField
                label="First Name"
                placeholder="Enter first name"
                required
                error={getFieldError(
                  formik.errors.firstName,
                  formik.touched.firstName,
                )}
                {...formik.getFieldProps('firstName')}
              />
              <SizedBox height={16} />
              <TextField
                label="Last Name"
                placeholder="Enter last name"
                required
                error={getFieldError(
                  formik.errors.lastName,
                  formik.touched.lastName,
                )}
                {...formik.getFieldProps('lastName')}
              />
              <SizedBox height={24} />
              <Button
                disabled={formik.touched && !formik.isValid}
                isLoading={loading}
                fullWidth
              >
                Finish
              </Button>
            </form>

            <SizedBox height={24} />
            <Text alignment="center" variant="lighter">
              Or complete signup with social
            </Text>
            <SizedBox height={16} />
            <GoogleSocialLogin
              onSuccess={(response) => {
                const profile = (response as GoogleLoginResponse)?.profileObj;
                profile &&
                  formik.setValues({
                    email: profile.email,
                    firstName: profile.givenName,
                    lastName: profile.familyName,
                    channel: SignUpChannel.Mobile,
                    dataSource: DataSourceEnum.Google,
                  });
              }}
              onFailure={(user) => logger.log('user:>> ', user)}
            />
            <FacebookLogin
              onSuccess={(user) => {
                const { profile } = user;
                formik.setValues({
                  email: profile.email,
                  firstName: profile.first_name,
                  lastName: profile.last_name,
                  channel: SignUpChannel.Mobile,
                  dataSource: DataSourceEnum.Facebook,
                });
              }}
              onFailure={(user) => logger.log(user)}
            />
          </Column>
        </Card>
      </Column>
    </PageBody>
  );
};
