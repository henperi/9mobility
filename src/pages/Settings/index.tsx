import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Column } from '../../components/Column';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Styles as CardStyles } from '../../components/Card/styles';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { SizedBox } from '../../components/SizedBox';
import { Colors } from '../../themes/colors';
import { Row } from '../../components/Row';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError, isFutureDate } from '../../utils/formikHelper';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { useLazyFetch, usePost } from '../../customHooks/useRequests';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
import { ErrorBox } from '../../components/ErrorBox';
import { ConfirmOTP } from './ConfirmOTP';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { logger } from '../../utils/logger';
import { Spinner } from '../../components/Spinner';
import { setAuthUser } from '../../store/modules/auth/actions';

interface SuccessResp {
  responseCode: number;
  message: string;
}

interface VerifyNumberResponse {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

export const Settings = () => {
  const { mobileNumbers } = useGetMobileNumbers();

  const history = useHistory();
  const [activeDND, setActiveDND] = useState(false);
  const [activeVoicemail, setActiveVoicemail] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showOTPScreen, setshowOTPScreen] = useState(false);

  const [requestOTP, { loading: OTPLoading, data: OTPData }] = useLazyFetch<
    VerifyNumberResponse
  >('Mobility.Onboarding/api/Verification/initiateinappotp');

  const [
    updateProfile,
    {
      loading: profildUpdateLoading,
      error: profileUpdateErr,
      data: profileUpdateData,
    },
  ] = usePost<SuccessResp>('Mobility.Onboarding/api/Onboarding/editprofile');

  const {
    state: {
      auth: { user },
    },
    dispatch,
  } = useGlobalStore();

  const updateUserProfile = async () => {
    try {
      const result = await updateProfile({ ...formik.values });
      if (
        result.data &&
        formik.values.firstName &&
        formik.values.lastName &&
        user
      ) {
        dispatch(
          setAuthUser({
            ...user,
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            dob: formik.values.dob,
          }),
        );
        setShowSuccessModal(true);
      }
    } catch (err) {
      logger.log(err);
    }
  };

  const getOTP = async () => {
    try {
      await requestOTP();
    } catch (err) {
      logger.log(err);
    }
  };

  useEffect(() => {
    if (OTPData?.result?.trackingId) {
      setshowOTPScreen(true);
    }
  }, [OTPData]);

  const dob =
    user?.dob &&
    DateTime.fromISO(user?.dob, {
      locale: 'fr',
    }).toISODate();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      dob,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('This field is required'),
      lastName: Yup.string().required('This field is required'),
      dob: Yup.string().test('DOB', 'Future dates are not allowed', (value) => {
        return !isFutureDate(value);
      }),
    }),
    onSubmit: async (formData) => {
      getOTP();
    },
  });

  const renderModals = () => (
    <>
      <Modal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        size="sm"
      >
        {profileUpdateErr && <ErrorBox>{profileUpdateErr.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          {profileUpdateData?.message && (
            <Text>{profileUpdateData?.message}</Text>
          )}
          <SizedBox height={10} />
          <Button onClick={() => setShowSuccessModal(false)} fullWidth>
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  if (showOTPScreen && OTPData && mobileNumbers) {
    return (
      <ConfirmOTP
        message={OTPData?.message}
        setshowOTPScreen={setshowOTPScreen}
        callbackFunction={updateUserProfile}
        trackingId={OTPData.result.trackingId}
        mobileNumber={mobileNumbers[0].value}
      />
    );
  }

  return (
    <PageBody>
      <Column justifyContent="center">
        <Column xs={12} md={10} lg={9}>
          <CardStyles.CardHeader
            style={{ height: '100%', position: 'relative', padding: '28px' }}
          >
            <img src={appLogoBig} alt="appLogoBig" />

            <Column>
              <SizedBox height={10} />
              <Text size={32} weight={500}>
                Settings
              </Text>
              <SizedBox height={5} />
              <Text weight={500} color={Colors.grey}>
                Manage your account
              </Text>
              <SizedBox height={30} />
            </Column>
          </CardStyles.CardHeader>

          <SizedBox height={20} />

          <Row childGap={15}>
            {profildUpdateLoading && <Spinner isFixed />}
            <Column xs={12} lg={5}>
              <Card fullHeight fullWidth>
                <Text size={18} weight={600}>
                  Profile Settings
                </Text>
                <Text>Manage Profile</Text>
                <SizedBox height={20} />

                <Column justifyContent="center">
                  <Avatar
                    name="profile-avatar"
                    style={{ width: '50px', height: '50px' }}
                    image="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                  />
                  {/* <Text>Tap to change pic</Text> */}
                </Column>

                <SizedBox height={20} />

                <form onSubmit={formik.handleSubmit}>
                  {profileUpdateErr && (
                    <ErrorBox>{profileUpdateErr.message}</ErrorBox>
                  )}

                  <TextField
                    label="First Name"
                    placeholder="Enter first name"
                    {...formik.getFieldProps('firstName')}
                    type="text"
                    error={getFieldError(
                      formik.errors.firstName,
                      formik.touched.firstName,
                    )}
                  />
                  <SizedBox height={20} />
                  <TextField
                    label="Last Name"
                    placeholder="Enter Last name"
                    {...formik.getFieldProps('lastName')}
                    type="test"
                    error={getFieldError(
                      formik.errors.lastName,
                      formik.touched.lastName,
                    )}
                  />
                  <SizedBox height={20} />

                  <TextField
                    label="Date of birth"
                    placeholder="Select DOB"
                    {...formik.getFieldProps('dob')}
                    type="date"
                    error={getFieldError(formik.errors.dob, formik.touched.dob)}
                  />
                  <SizedBox height={20} />

                  <Button
                    type="submit"
                    fullWidth
                    isLoading={OTPLoading}
                    disabled={profildUpdateLoading}
                  >
                    Update
                  </Button>
                  <SizedBox height={20} />
                </form>
              </Card>
            </Column>
            <Column xs={12} lg={7} style={{ flex: '1' }}>
              <Card fullWidth fullHeight>
                <Text size={18} weight={600}>
                  Manage Numbers
                </Text>
                <SizedBox height={10} />

                <Text>Add, remove or manage numbers on your profile</Text>
                <SizedBox height={20} />
                <Button
                  variant="default"
                  border
                  type="submit"
                  fullWidth
                  style={{
                    borderWidth: '1px',
                    borderColor: `${Colors.darkGreen}`,
                  }}
                  onClick={() => history.push('/settings/manage-numbers')}
                >
                  Manage Numbers
                </Button>
              </Card>
              <SizedBox height={30} />
              <Card fullWidth fullHeight>
                <Text size={18} weight={600}>
                  Personalized Settings
                </Text>
                <SizedBox height={10} />
                <Text>Manage your personalized settings here</Text>
                <SizedBox height={40} />
                <Card
                  fullWidth
                  style={{
                    border: `solid 1px ${Colors.grey}`,
                    padding: '10px',
                  }}
                >
                  <Row justifyContent="space-between">
                    <Column xs={6}>
                      <Text size={16} weight={500}>
                        DND
                      </Text>
                      <Text size={12}>Do not disturb service</Text>
                    </Column>
                    <Column xs={6} justifyContent="flex-end">
                      <ToggleSwitch
                        id="DND"
                        onChange={() => setActiveDND(!activeDND)}
                        checked={activeDND}
                      />
                    </Column>
                  </Row>
                </Card>
                <SizedBox height={25} />
                <Card
                  fullWidth
                  style={{
                    border: `solid 1px ${Colors.grey}`,
                    padding: '10px',
                  }}
                >
                  <Row justifyContent="space-between">
                    <Column xs={6}>
                      <Text size={16} weight={500}>
                        Voicemail
                      </Text>
                      <Text size={12}>Enable voicemail service</Text>
                    </Column>
                    <Column xs={6} justifyContent="flex-end">
                      <ToggleSwitch
                        id="voicemail"
                        onChange={() => setActiveVoicemail(!activeVoicemail)}
                        checked={activeVoicemail}
                      />
                    </Column>
                  </Row>
                </Card>
              </Card>
            </Column>
          </Row>
        </Column>
        {renderModals()}
      </Column>
    </PageBody>
  );
};
