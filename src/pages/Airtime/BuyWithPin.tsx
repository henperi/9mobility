import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { BackButton } from '../../components/BackButton';
import { getFieldError } from '../../utils/formikHelper';
import { usePost } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { logger } from '../../utils/logger';
import { emptyError, IError } from '../Data/Interface';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const BuyWithPin: React.FC = () => {
  const [activeTab, setactiveTab] = useState(1);

  const [rechargeWithPin, { loading, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/Airtime/RechargeWithPin',
  );

  const { mobileNumbers } = useGetMobileNumbers();

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      recipientMobileNumber: '',
      voucherPin: '',
    },
    validationSchema: Yup.object({
      recipientMobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      voucherPin: Yup.string()
        .min(15, 'Must be a 15 digit number')
        .max(15, 'Must be a 15 digit number')
        .required('This field is required'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const handleTabChange = () => {
    if (activeTab === 1) {
      formik.setFieldValue('mobileNumber', '');
      formik.setFieldValue('recipientMobileNumber', '');
      return setactiveTab(2);
    }

    return setactiveTab(1);
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [buyWithPinError, setBuyWithPinError] = useState<IError>(emptyError);

  const handleRechargeWithPin = async () => {
    try {
      const response = await rechargeWithPin(formik.values);

      if (response.data) {
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  useEffect(() => {
    if (error) {
      setBuyWithPinError(error);
    }
  }, [error]);

  const BuyDataWithPinError = buyWithPinError.message && (
    <ErrorBox>{buyWithPinError.message}</ErrorBox>
  );

  const renderModals = () => (
    <>
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setBuyWithPinError(emptyError);
        }}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {BuyDataWithPinError}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You are about to purchase airtime for{' '}
            <Text variant="darker">{formik.values.recipientMobileNumber}</Text>{' '}
            with a voucher
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleRechargeWithPin}
                isLoading={loading}
                fullWidth
              >
                Confirm
              </Button>
            </Column>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setBuyWithPinError(emptyError);
                }}
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
          <Button
            onClick={() => setShowSuccessModal(false)}
            isLoading={loading}
            fullWidth
          >
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  return (
    <>
      <PageBody centeralize>
        <Column xs={12} md={6} lg={5}>
          <CardStyles.CardHeader
            style={{ height: '100%', position: 'relative', padding: '20px' }}
          >
            <img src={appLogoBig} alt="appLogoBig" />

            <BackButton />

            <SizedBox height={25} />

            <Column justifyContent="center">
              <Text size={18} weight={500}>
                Buy Airtime with PIN
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Recharge with purchased PIN
              </Text>
            </Column>
          </CardStyles.CardHeader>
          <Card showOverlayedDesign fullWidth padding="12% 15%">
            <Row
              wrap
              justifyContent="center"
              alignItems="center"
              style={{
                border: `1px solid ${Colors.lightGreen}`,
                padding: '2px',
              }}
            >
              <Column xs={6} style={{ marginBottom: 0 }}>
                <Button
                  fullWidth
                  variant={activeTab === 1 ? 'tertiary' : 'default'}
                  onClick={handleTabChange}
                >
                  <Text size={14}>Recharge Self</Text>
                </Button>
              </Column>
              <Column xs={6} style={{ marginBottom: 0 }}>
                <Button
                  variant={activeTab === 2 ? 'tertiary' : 'default'}
                  onClick={handleTabChange}
                  fullWidth
                >
                  <Text size={14}>Recharge others</Text>
                </Button>
              </Column>
            </Row>
            <SizedBox height={24} />
            <form onSubmit={formik.handleSubmit}>
              {activeTab === 1 && (
                <TextField
                  label="Select Phone Number"
                  placeholder="Select Phone"
                  dropDown
                  dropDownOptions={mobileNumbers}
                  value={formik.values.mobileNumber}
                  onChange={(e) =>
                    formik.setFieldValue('mobileNumber', e.target.value)
                  }
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  error={getFieldError(
                    formik.errors.mobileNumber,
                    formik.touched.mobileNumber,
                  )}
                />
              )}
              {activeTab === 2 && (
                <TextField
                  label="Recipient phone number"
                  placeholder="Enter Phone number"
                  onChange={(e) => {
                    formik.setFieldValue(
                      'recipientMobileNumber',
                      e.target.value,
                    );
                    formik.setFieldValue('mobileNumber', e.target.value);
                  }}
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  error={getFieldError(
                    formik.errors.recipientMobileNumber,
                    formik.touched.recipientMobileNumber,
                  )}
                />
              )}
              <SizedBox height={16} />
              <TextField
                label="Voucher"
                placeholder="Enter 15 digit PIN"
                {...formik.getFieldProps('voucherPin')}
                type="tel"
                minLength={15}
                maxLength={15}
                error={getFieldError(
                  formik.errors.voucherPin,
                  formik.touched.voucherPin,
                )}
              />
              <SizedBox height={24} />
              <Button type="submit" isLoading={loading} fullWidth>
                Recharge Now
              </Button>
              {renderModals()}
            </form>
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
