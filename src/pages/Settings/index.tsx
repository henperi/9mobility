import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
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
import { getFieldError } from '../../utils/formikHelper';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { logger } from '../../utils/logger';
import { usePost } from '../../customHooks/useRequests';
import { Modal } from '../../components/Modal';
import { ErrorBox } from '../../components/ErrorBox';
import { useGlobalStore } from '../../store';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const Settings = () => {
  const history = useHistory();
  const [activeDND, setActiveDND] = useState(false);
  const [activeVoicemail, setActiveVoicemail] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [updateProfile, { loading, data, error }] = usePost<SuccessResp>(
    'Mobility.Onboarding/api/Onboarding/editprofile',
  );

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      dob: user?.dob,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('This field is required'),
      lastName: Yup.string().required('This field is required'),
      dob: Yup.string().required('This field is required'),
    }),
    onSubmit: async (formData) => {
      handleProfileUpdate();
    },
  });

  const handleProfileUpdate = async () => {
    try {
      const response = await updateProfile(formik.values);
      if (response.data) {
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const renderModals = () => (
    <Modal
      isVisible={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
      size="sm"
    >
      {error && <ErrorBox>{error.message}</ErrorBox>}
      <SizedBox height={15} />
      <Column>
        <Text>Hi {user?.firstName}</Text>
        <SizedBox height={15} />
        {data?.message && <Text>{data?.message}</Text>}
        <SizedBox height={10} />
        <Button
          onClick={() => setShowSuccessModal(false)}
          isLoading={loading}
          fullWidth
        >
          Done
        </Button>
      </Column>
    </Modal>
  );

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
                    image="https://cdn.cnn.com/cnnnext/dam/assets/140217175126-15-mixed-biracial-black-horizontal-large-gallery.jpg"
                  />
                  <Text>Tap to change pic</Text>
                </Column>

                <SizedBox height={20} />

                <form onSubmit={formik.handleSubmit}>
                  {error && <ErrorBox>{error.message}</ErrorBox>}

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

                  <Button type="submit" fullWidth>
                    Recharge Now
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
