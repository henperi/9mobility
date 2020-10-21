import React, { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { Card } from '../../components/Card';
import { BackButton } from '../../components/BackButton';
import { Row } from '../../components/Row';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError } from '../../utils/formikHelper';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { rem } from '../../utils/rem';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { generateShortId } from '../../utils/generateShortId';
import { Modal } from '../../components/Modal';
import { logger } from '../../utils/logger';
import { usePost } from '../../customHooks/useRequests';
import { useGlobalStore } from '../../store';
import { ErrorBox } from '../../components/ErrorBox';
import { Spinner } from '../../components/Spinner';
import { ConfirmOTP } from './ConfirmOTP';

interface VerifyNumberResponse {
  result: {
    trackingId: string;
    expiresIn: Date;
  };
  responseCode: number;
  message: string;
}

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const ManageNumbers = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');

  const [addNumberOTP, setAddNumberOTP] = useState(false);
  const [activateNumberOTP, setActivateNumberOTP] = useState(false);
  const [deactivateNumberConfirm, setDeactivateNumberConfirm] = useState(false);
  const [removeNumberConfirm, setRemoveNumberConfirm] = useState(false);

  const {
    loading: loadingNumbers,
    data: numbersData,
    refetch: refetchMobileNumbers,
  } = useGetMobileNumbers();

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      simNumber: '',
    },
    validationSchema: Yup.object({
      simNumber: Yup.string().required('This field is required'),
    }),
    onSubmit: async ({ simNumber }) => {
      getOTP(simNumber);
      setAddNumberOTP(true);
    },
  });

  const getOTP = async (mobileNumber: string) => {
    try {
      await requestOTP({ mobileNumber });
    } catch (err) {
      logger.log(err);
    }
  };

  const [requestOTP, { data: OTPData }] = usePost<VerifyNumberResponse>(
    'Mobility.Onboarding/api/Verification/initsimotp',
  );

  const [addNumber, { loading: adding, error: addError }] = usePost<
    SuccessResp
  >('Mobility.Onboarding/api/Onboarding/addsim');

  const [removeNumber, { loading: removing, error: removeError }] = usePost<
    SuccessResp
  >('Mobility.Onboarding/api/Onboarding/removesim');

  const [
    activateNumber,
    { loading: activating, error: activationError },
  ] = usePost<SuccessResp>('Mobility.Onboarding/api/Onboarding/activatesim');

  const [
    deactivateNumber,
    { loading: deactivating, error: deactivationError },
  ] = usePost<SuccessResp>('Mobility.Onboarding/api/Onboarding/deactivatesim');

  const addSimNumber = async () => {
    try {
      const response = await addNumber(formik.values);

      if (response.data) {
        refetchMobileNumbers();
        setAddNumberOTP(false);
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const activateSimNumber = async () => {
    try {
      const response = await activateNumber({ simNumber: selectedPhone });
      if (response?.data) {
        refetchMobileNumbers();
        setActivateNumberOTP(false);
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const deactivateSimNumber = async () => {
    try {
      const response = await deactivateNumber({ simNumber: selectedPhone });
      if (response?.data) {
        refetchMobileNumbers();
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const removeSimNumber = async () => {
    try {
      const response = await removeNumber({ simNumber: selectedPhone });
      if (response?.data) {
        refetchMobileNumbers();
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const renderModals = () => (
    <>
      <Modal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        size="sm"
      >
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>Your request was successful</Text>
          <SizedBox height={15} />
          <Text>Thank you for using 9mobile</Text>
          <SizedBox height={10} />
          <Button onClick={() => setShowSuccessModal(false)} fullWidth>
            Done
          </Button>
        </Column>
      </Modal>

      <Modal
        isVisible={removeNumberConfirm}
        onClose={() => setRemoveNumberConfirm(false)}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {removeError && <ErrorBox>{removeError.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            Are you sure you want to remove{' '}
            <Text variant="darker">{selectedPhone}</Text> from your sim numbers?
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button onClick={removeSimNumber} isLoading={removing} fullWidth>
                Confirm
              </Button>
            </Column>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => setRemoveNumberConfirm(false)}
                outline
                fullWidth
              >
                Cancel
              </Button>
            </Column>
          </Row>
        </Column>
      </Modal>

      <Modal
        isVisible={deactivateNumberConfirm}
        onClose={() => setDeactivateNumberConfirm(false)}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {deactivationError && <ErrorBox>{deactivationError.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            Are you sure you want to deactivate{' '}
            <Text variant="darker">{selectedPhone}</Text>?
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={deactivateSimNumber}
                isLoading={deactivating}
                fullWidth
              >
                Confirm
              </Button>
            </Column>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => setDeactivateNumberConfirm(false)}
                outline
                fullWidth
              >
                Cancel
              </Button>
            </Column>
          </Row>
        </Column>
      </Modal>
    </>
  );

  if (addNumberOTP && OTPData) {
    return (
      <ConfirmOTP
        message={OTPData?.message}
        setshowOTPScreen={setAddNumberOTP}
        callbackFunction={addSimNumber}
        trackingId={OTPData.result.trackingId}
        mobileNumber={formik.values.simNumber}
      />
    );
  }

  if (activateNumberOTP && OTPData && selectedPhone) {
    return (
      <ConfirmOTP
        message={OTPData?.message}
        setshowOTPScreen={setActivateNumberOTP}
        callbackFunction={activateSimNumber}
        trackingId={OTPData.result.trackingId}
        mobileNumber={selectedPhone}
      />
    );
  }

  return (
    <PageBody>
      <Column justifyContent="center">
        <Column xs={12} md={6} lg={6}>
          <CardStyles.CardHeader
            style={{ height: '100%', position: 'relative', padding: '20px' }}
          >
            <img src={appLogoBig} alt="appLogoBig" />

            <BackButton />

            <SizedBox height={25} />

            <Column justifyContent="center">
              <Text size={18} weight={500}>
                Manage Numbers
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Add and manage all your numbers
              </Text>
            </Column>
          </CardStyles.CardHeader>
          <Card showOverlayedDesign fullWidth padding="5% 5%">
            <Text weight={600}>Add Number</Text>
            {addError && <ErrorBox>{addError.message}</ErrorBox>}

            <form onSubmit={formik.handleSubmit}>
              <Row childGap={5}>
                <Column xs={12} xl={8}>
                  <TextField
                    placeholder="Enter new number to add"
                    {...formik.getFieldProps('simNumber')}
                    minLength={11}
                    maxLength={11}
                    type="tel"
                    error={getFieldError(
                      formik.errors.simNumber,
                      formik.touched.simNumber,
                    )}
                  />
                </Column>
                <Column xs={12} xl={4} style={{ flex: '1' }}>
                  <Button
                    variant="default"
                    border
                    type="submit"
                    fullWidth
                    style={{
                      borderWidth: '1px',
                      borderColor: `${Colors.darkGreen}`,
                      marginTop: `${rem(3)}`,
                    }}
                    isLoading={adding}
                  >
                    Add Number
                  </Button>
                </Column>
              </Row>
            </form>
            <SizedBox height={30} />
            <Column>
              {removeError && <ErrorBox>{removeError.message}</ErrorBox>}
              {activationError && (
                <ErrorBox>{activationError.message}</ErrorBox>
              )}
              {deactivationError && (
                <ErrorBox>{deactivationError.message}</ErrorBox>
              )}

              {loadingNumbers || activating || deactivating || removing ? (
                <Spinner isFixed />
              ) : (
                <>
                  <Text weight={600}>Existing Numbers</Text>

                  {numbersData?.result?.map((num) => (
                    <Column key={generateShortId()}>
                      <Card
                        style={{
                          padding: '3%',
                          background: `${convertHexToRGBA(Colors.grey, 0.2)}`,
                        }}
                        fullWidth
                      >
                        <Row alignItems="center">
                          <Column xs={4}>
                            <Text color={Colors.black} weight="500">
                              {num.mobileNumber}
                            </Text>
                            <Text size={13} color={Colors.blackGrey}>
                              Primary
                            </Text>
                          </Column>
                          <Column xs={4} alignItems="center">
                            <Text
                              size={13}
                              color={Colors.darkGreen}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setSelectedPhone(num.mobileNumber);
                                setRemoveNumberConfirm(true);
                              }}
                            >
                              remove number
                            </Text>
                          </Column>
                          <Column xs={4}>
                            {num.isActive ? (
                              <Text
                                size={13}
                                color={Colors.darkGreen}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedPhone(num.mobileNumber);
                                  setDeactivateNumberConfirm(true);
                                }}
                              >
                                Deactivate number
                              </Text>
                            ) : (
                              <Text
                                size={13}
                                color={Colors.darkGreen}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setActivateNumberOTP(true);
                                  setSelectedPhone(num.mobileNumber);
                                  getOTP(num.mobileNumber);
                                }}
                              >
                                Activate number
                              </Text>
                            )}
                          </Column>
                        </Row>
                      </Card>
                      <SizedBox height={10} />
                    </Column>
                  ))}
                </>
              )}
            </Column>
          </Card>
        </Column>
        {renderModals()}
      </Column>
    </PageBody>
  );
};
