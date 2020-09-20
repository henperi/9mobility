import React, { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { useHistory } from 'react-router-dom';
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
// import { SuccessBox } from '../../components/SuccessBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';

interface SuccessResp {
  result: {
    paymentLink: string;
  };
  responseCode: number;
  message: string;
}

export const BuyWithDebitCard: React.FC = () => {
  const [activeTab, setactiveTab] = useState(1);

  const [buyWithDebitCard, { loading, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/Airtime/BuyAirtimeFromDebitCard',
  );

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      amount: '',
      email: user?.email,
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      amount: Yup.number().required('This field is required'),
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

  const handleBuyWithDebitCard = async () => {
    const response = await buyWithDebitCard(formik.values);

    if (response.data) {
      setShowConfirmationModal(false);

      window.open(response.data.result.paymentLink, '_blank');
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
            You are about to purchase{' '}
            <Text variant="darker">N{formik.values.amount}</Text> airtime for{' '}
            <Text variant="darker">{formik.values.mobileNumber}</Text> with your
            debit card
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleBuyWithDebitCard}
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
                Buy Airtime
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Pay with debit card
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
                  {...formik.getFieldProps('mobileNumber')}
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  error={getFieldError(
                    formik.errors.mobileNumber,
                    formik.touched.mobileNumber,
                  )}
                />
              )}
              <SizedBox height={16} />
              <TextField
                label="Amount"
                placeholder="Enter an amount e.g 500"
                {...formik.getFieldProps('amount')}
                type="text"
                minLength={16}
                maxLength={16}
                error={getFieldError(
                  formik.errors.amount,
                  formik.touched.amount,
                )}
              />
              <SizedBox height={10} />
              <Text size={10}>Or select from the list</Text>
              <Row useAppMargin>
                <Column useAppMargin xs={3}>
                  <Button
                    onClick={() => formik.setFieldValue('amount', 200)}
                    fullWidth
                    variant="secondary"
                    type="button"
                    outline={String(formik.values.amount) !== String(200)}
                  >
                    N200
                  </Button>
                </Column>
                <Column useAppMargin xs={3}>
                  <Button
                    onClick={() => formik.setFieldValue('amount', 500)}
                    fullWidth
                    variant="secondary"
                    type="button"
                    outline={String(formik.values.amount) !== String(500)}
                  >
                    N500
                  </Button>
                </Column>
                <Column useAppMargin xs={3}>
                  <Button
                    onClick={() => formik.setFieldValue('amount', 1000)}
                    fullWidth
                    variant="secondary"
                    type="button"
                    outline={String(formik.values.amount) !== String(1000)}
                  >
                    N1000
                  </Button>
                </Column>
                <Column useAppMargin xs={3}>
                  <Button
                    onClick={() => formik.setFieldValue('amount', 2000)}
                    fullWidth
                    variant="secondary"
                    type="button"
                    outline={String(formik.values.amount) !== String(2000)}
                  >
                    N2000
                  </Button>
                </Column>
              </Row>
              <SizedBox height={10} />
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