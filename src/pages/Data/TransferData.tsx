import React, { useState } from 'react';

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
import { logger } from '../../utils/logger';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const TransferData: React.FC = () => {
  const { mobileNumbers } = useGetMobileNumbers();

  const [transferAirtime, { loading, data, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/Data/Transfer',
  );

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      recipientMobileNumber: '',
      securityCode: '',
      amount: '',
    },
    validationSchema: Yup.object({
      recipientMobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      securityCode: Yup.string()
        .min(4, 'Must be a 4 digit number')
        .max(4, 'Must be a 16 digit number')
        .required('This field is required'),
      amount: Yup.number()
        .min(10, 'Amount must be at least ₦10')
        .typeError("Value must be a valid integer")
        .required(),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleTransferAirtime = async () => {
    try {
      const response = await transferAirtime({
        ...formik.values,
        mobileNumber: mobileNumbers && mobileNumbers[0].value,
      });

      if (response.data) {
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
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
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You are about to transfer&nbsp;
            <Text variant="darker">{formik.values.amount}</Text>mb data to
            &nbsp;
            <Text variant="darker">{formik.values.recipientMobileNumber}</Text>
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleTransferAirtime}
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
                  Transfer Data
                </Text>
                <Text size={14} color={Colors.grey} weight={200}>
                  Send data to another
                </Text>
              </Column>
            </CardStyles.CardHeader>
            <Card showOverlayedDesign fullWidth padding="7% 20%">
              {error && <ErrorBox>{error.message}</ErrorBox>}
              {data && <SuccessBox>{data.message}</SuccessBox>}
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  label="Security code"
                  placeholder="Enter Security code"
                  {...formik.getFieldProps('securityCode')}
                  minLength={4}
                  maxLength={4}
                  helperText="Default code is 0000"
                  error={getFieldError(
                    formik.errors.securityCode,
                    formik.touched.securityCode,
                  )}
                />

                <SizedBox height={16} />
                <TextField
                  label="Amount"
                  placeholder="Enter data amount you want to transfer"
                  {...formik.getFieldProps('amount')}
                  type="tel"
                  minLength={1}
                  error={getFieldError(
                    formik.errors.amount,
                    formik.touched.amount,
                  )}
                />
                <SizedBox height={16} />

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
                <SizedBox height={24} />
                <Button type="submit" isLoading={loading} fullWidth>
                  Transfer
                </Button>
                {renderModals()}
              </form>
            </Card>
          </Column>
        </Column>
      </PageBody>
    </>
  );
};
