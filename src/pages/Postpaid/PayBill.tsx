import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { TextField } from '../../components/TextField';
import { getFieldError } from '../../utils/formikHelper';
import { Modal } from '../../components/Modal';
import { CorporateDetailsResp, SuccessResp } from './Interface';
import { useLazyFetch, usePost } from '../../customHooks/useRequests';
import { logger } from '../../utils/logger';
import { ErrorBox } from '../../components/ErrorBox';
import { useGlobalStore } from '../../store';
import { Row } from '../../components/Row';
import { Spinner } from '../../components/Spinner';

export const PayBill = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const [
    getCorporateDetails,
    {
      data: corporateData,
      error: corporateDataError,
      loading: corporateDetailsLoading,
    },
  ] = useLazyFetch<CorporateDetailsResp>(
    'Mobility.Account/api/PostPayTransaction/GetCorporateDetail',
  );

  useEffect(() => {
    getCorporateDetails();
  }, [getCorporateDetails]);

  const [payPostpaidBill, { loading, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/PostPayTransaction/PayBill',
  );

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('This field is required'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const handlePospaidBillPayment = async () => {
    try {
      const response = await payPostpaidBill({
        amount: Number(formik.values.amount),
        contractNumber: corporateData?.result?.contractNumber,
      });

      if (response.data) {
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
        formik.resetForm();
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
          <Text>Hi {user?.firstName}</Text>
          <SizedBox height={15} />
          <Text>
            You are about to pay &nbsp;
            <Text variant="darker">N{formik.values.amount}</Text> for your
            postpaid bill
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handlePospaidBillPayment}
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
    <PageBody centeralize>
      <Column xs={12} md={7} lg={6}>
        <CardStyles.CardHeader
          style={{ height: '100%', position: 'relative', padding: '20px' }}
        >
          <img src={appLogoBig} alt="appLogoBig" />

          <BackButton />

          <SizedBox height={25} />

          <Column justifyContent="center">
            <Text size={18} weight={500}>
              International call (IDD) rates
            </Text>
            <Text size={14} color={Colors.grey} weight={200}>
              Rates in country visited & back to Nigeria
            </Text>
          </Column>
        </CardStyles.CardHeader>

        <Card showOverlayedDesign fullWidth>
          {error && <ErrorBox>{error.message}</ErrorBox>}
          {corporateDetailsLoading ? (
            <Spinner isFixed />
          ) : (
            <>
              {corporateDataError ? (
                <ErrorBox>{corporateDataError?.message}</ErrorBox>
              ) : (
                <>
                  <Card
                    fullWidth
                    style={{
                      backgroundColor: convertHexToRGBA(
                        Colors.yellowGreen,
                        0.2,
                      ),
                      padding: '3%',
                    }}
                  >
                    <Row wrap justifyContent="space-between">
                      <Column xs={6}>
                        <Text size={16} weight="500" color={Colors.darkGreen}>
                          {corporateData?.result.contractName}
                        </Text>
                        <Text size={14}>
                          Admin: {corporateData?.result.adminNumber}
                        </Text>
                      </Column>
                      <Column xs={6} justifyContent="flex-end">
                        <Text size={16} weight="500" color={Colors.darkGreen}>
                          {corporateData?.result.contractNumber}
                        </Text>
                        <Text size={14}>Contact Number</Text>
                      </Column>
                    </Row>
                  </Card>

                  <SizedBox height={30} />

                  <Row justifyContent="center">
                    <Column xs={8}>
                      <form onSubmit={formik.handleSubmit}>
                        <TextField
                          label="Amount"
                          placeholder="Enter An Amount e.g 500"
                          {...formik.getFieldProps('amount')}
                          type="text"
                          error={getFieldError(
                            formik.errors.amount,
                            formik.touched.amount,
                          )}
                        />
                        <SizedBox height={24} />
                        <Button type="submit" isLoading={loading} fullWidth>
                          Pay Bill
                        </Button>
                        <SizedBox height={60} />

                        {renderModals()}
                      </form>
                    </Column>
                  </Row>
                </>
              )}
            </>
          )}
        </Card>
      </Column>
    </PageBody>
  );
};
