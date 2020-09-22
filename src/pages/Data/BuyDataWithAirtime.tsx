import React, { Fragment, useState } from 'react';

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
import { SuccessBox } from '../../components/SuccessBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
// import { handleAxiosError } from '../../utils/handleAxiosError';
// import { logger } from '../../utils/logger';
// import { logger } from '../../utils/logger';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const BuyDataWithAirtime: React.FC = () => {
  const [activeTab, setactiveTab] = useState(1);

  const [rechargeWithPin, { loading, data, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/Airtime/RechargeWithPin',
  );

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      recipientMobileNumber: '',
      amount: '',
      dataValue: '',
      dataBundle: '',
    },
    validationSchema: Yup.object({
      recipientMobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      voucherPin: Yup.string()
        .min(16, 'Must be a 16 digit number')
        .max(16, 'Must be a 16 digit number')
        .required('This field is required'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const handleTabChange = () => {
    formik.resetForm();
    if (activeTab === 1) {
      return setactiveTab(2);
    }
    return setactiveTab(1);
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRechargeWithPin = async () => {
    const response = await rechargeWithPin(formik.values);

    if (response.data) {
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    }
  };

  const renderModals = () => (
    <>
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {error && <ErrorBox>{error.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName}</Text>
          <SizedBox height={15} />
          <Text>
            You are about to purchase data for
            <Text variant="darker">{formik.values.recipientMobileNumber}</Text>
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
                onClick={() => setShowConfirmationModal(false)}
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
        {error && <ErrorBox>{error.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName}</Text>
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
                Buy Data
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Pay using your airtime balance
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
            {error && <ErrorBox>{error.message}</ErrorBox>}
            {data && <SuccessBox>{data.message}</SuccessBox>}
            <form onSubmit={formik.handleSubmit}>
              {activeTab === 1 && (
                <TextField
                  label="Select Phone Number"
                  placeholder="Select Phone"
                  dropDown
                  dropDownOptions={[
                    { label: '09095017151', value: '09095017151' },
                    { label: '09091881282', value: '09091881282' },
                  ]}
                  value={formik.values.recipientMobileNumber}
                  onChange={(e) =>
                    formik.setFieldValue(
                      'recipientMobileNumber',
                      e.target.value,
                    )
                  }
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  error={getFieldError(
                    formik.errors.recipientMobileNumber,
                    formik.touched.recipientMobileNumber,
                  )}
                />
              )}
              {activeTab === 2 && (
                <TextField
                  label="Recipient phone number"
                  placeholder="Enter Phone number"
                  {...formik.getFieldProps('recipientMobileNumber')}
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  error={getFieldError(
                    formik.errors.recipientMobileNumber,
                    formik.touched.recipientMobileNumber,
                  )}
                />
              )}
              {activeTab === 1 && (
                <Fragment>
                  <SizedBox height={16} />

                  <TextField
                    label="Data Bundle"
                    placeholder="Select Data Bundle"
                    dropDown
                    dropDownOptions={[
                      {
                        label: '1GB Daily(300 NGN)',
                        value: '1GB Daily(300 NGN)',
                      },
                      {
                        label: '1GB Daily(300 NGN)',
                        value: '1GB Daily(300 NGN)',
                      },
                    ]}
                    value={formik.values.dataBundle}
                    onChange={(e) =>
                      formik.setFieldValue('dataBundle', e.target.value)
                    }
                    type="tel"
                    minLength={11}
                    maxLength={11}
                    error={getFieldError(
                      formik.errors.dataBundle,
                      formik.touched.dataBundle,
                    )}
                  />
                </Fragment>
              )}

              <SizedBox height={24} />

              {activeTab === 2 && (
                <Row justifyContent="space-between">
                  <Column xs={12} md={6}>
                    <TextField
                      label="Amount in Naira"
                      placeholder="Enter Amount"
                      {...formik.getFieldProps('amount')}
                      type="text"
                      minLength={11}
                      maxLength={11}
                      error={getFieldError(
                        formik.errors.amount,
                        formik.touched.amount,
                      )}
                    />
                  </Column>
                  <Column xs={12} md={5}>
                    <TextField
                      label="Value in MB/GB"
                      placeholder=""
                      {...formik.getFieldProps('datavalue')}
                      type="text"
                      minLength={11}
                      maxLength={11}
                      error={getFieldError(
                        formik.errors.dataValue,
                        formik.touched.dataValue,
                      )}
                    />
                  </Column>
                </Row>
              )}

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
