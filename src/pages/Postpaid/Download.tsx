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
import { useLazyFetch } from '../../customHooks/useRequests';
import { logger } from '../../utils/logger';
import { ErrorBox } from '../../components/ErrorBox';
import { useGlobalStore } from '../../store';
import { Row } from '../../components/Row';
import { months, years } from './Data';
import { Spinner } from '../../components/Spinner';
// import { Spinner } from '../../components/Spinner';

export const Download = () => {
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

  const [
    downloadPostPaidBill,
    { loading, error: downloadError },
  ] = useLazyFetch<SuccessResp>(
    'Mobility.Account/api/PostPayTransaction/DownloadPostPaidBill',
  );

  useEffect(() => {
    getCorporateDetails();
  }, [getCorporateDetails]);

  const formik = useFormik({
    initialValues: {
      year: '',
      month: '',
    },
    validationSchema: Yup.object({
      year: Yup.string().required('This field is required'),
      month: Yup.string().required('This field is required'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const handleDownloadPostpaidBill = async () => {
    try {
      const response = await downloadPostPaidBill();

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
        {downloadError && <ErrorBox>{downloadError.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName}</Text>
          <SizedBox height={15} />
          <Text>You are about to download your postpaid bill</Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleDownloadPostpaidBill}
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
    <PageBody>
      <Column justifyContent="center">
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
                      <Column xs={12}>
                        <form onSubmit={formik.handleSubmit}>
                          <Row
                            childGap={10}
                            wrap
                            justifyContent="space-between"
                          >
                            <Column lg={6} xs={12} style={{ flex: '1' }}>
                              <TextField
                                label="Month"
                                placeholder="Select Year"
                                dropDown
                                dropDownOptions={months}
                                value={formik.values.month}
                                onChange={(e) =>
                                  formik.setFieldValue('month', e.target.value)
                                }
                                type="tel"
                                minLength={11}
                                maxLength={11}
                                error={getFieldError(
                                  formik.errors.month,
                                  formik.touched.month,
                                )}
                              />
                            </Column>
                            <Column lg={6} xs={12} style={{ flex: '1' }}>
                              <TextField
                                label="Year"
                                placeholder="Select Month"
                                dropDown
                                dropDownOptions={years}
                                value={formik.values.year}
                                onChange={(e) =>
                                  formik.setFieldValue('year', e.target.value)
                                }
                                type="tel"
                                minLength={11}
                                maxLength={11}
                                error={getFieldError(
                                  formik.errors.year,
                                  formik.touched.year,
                                )}
                              />
                            </Column>
                          </Row>
                          <SizedBox height={24} />
                          <Button type="submit" isLoading={loading} fullWidth>
                            View/Download
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
      </Column>
    </PageBody>
  );
};
