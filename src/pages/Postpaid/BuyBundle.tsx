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
import { useFetch, usePost } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { SuccessBox } from '../../components/SuccessBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
import useRadioInput from '../../components/RadioInput/useRadioInput';
import { logger } from '../../utils/logger';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { Spinner } from '../../components/Spinner';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export interface BundlesResp {
  result: {
    id: string;
    bundle: string;
    cost: string;
    dataValue: string;
    validityDays: number;
    isActive: boolean;
    description: string;
    dataPlanId: number;
    categoryName: string;
  }[];
}

export const BuyBundle: React.FC = () => {
  const { RadioInput: SelectBundleRadio } = useRadioInput(true);

  const [activeTab, setactiveTab] = useState(1);

  const [buyDataWithAirtime, { loading, data, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/Data/BuyWithAirtime',
  );

  const { mobileNumbers } = useGetMobileNumbers();

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const { data: bundlesData, loading: loadingBundles } = useFetch<BundlesResp>(
    'Mobility.Account/api/Data/GetBundle',
  );

  const [dataPlans, setDataPlans] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (bundlesData) {
      const plansResults = bundlesData?.result?.map((option) => ({
        label: option.description,
        value: String(option.dataPlanId),
      }));

      setDataPlans(plansResults);
    }
  }, [bundlesData]);

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      beneficiaryMobileNumber: '',
      bundleId: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      beneficiaryMobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      bundleId: Yup.string().required('This field is required'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const handleTabChange = () => {
    if (activeTab === 1) {
      formik.setFieldValue('beneficiaryMobileNumber', '');
      return setactiveTab(2);
    }
    formik.setFieldValue('beneficiaryMobileNumber', formik.values.mobileNumber);
    return setactiveTab(1);
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBuyDataWithAirtime = async () => {
    try {
      const response = await buyDataWithAirtime(formik.values);

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
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You are about to purchase postpaid data for &nbsp;
            <Text variant="darker">
              {formik.values.beneficiaryMobileNumber}
            </Text>
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleBuyDataWithAirtime}
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
                  Buy Postpaid Data Bundle
                </Text>
                <Text size={14} color={Colors.grey} weight={200}>
                  Pay using your airtime balance
                </Text>
              </Column>
            </CardStyles.CardHeader>

            <Card showOverlayedDesign fullWidth padding="8% 20%">
              {loadingBundles ? (
                <SizedBox height={300}>
                  <Spinner isFixed>Fetching Data Bundles</Spinner>
                </SizedBox>
              ) : (
                <>
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
                    <TextField
                      label="Select Phone Number"
                      placeholder="Select Phone"
                      dropDown
                      dropDownOptions={mobileNumbers}
                      value={formik.values.mobileNumber}
                      onChange={(e) => {
                        formik.setFieldValue('mobileNumber', e.target.value);
                        if (activeTab === 1) {
                          formik.setFieldValue(
                            'beneficiaryMobileNumber',
                            e.target.value,
                          );
                        }
                      }}
                      type="tel"
                      minLength={11}
                      maxLength={11}
                      error={getFieldError(
                        formik.errors.mobileNumber,
                        formik.touched.mobileNumber,
                      )}
                    />
                    {activeTab === 2 && (
                      <TextField
                        label="Recipient phone number"
                        placeholder="Enter Phone number"
                        {...formik.getFieldProps('beneficiaryMobileNumber')}
                        type="tel"
                        minLength={11}
                        maxLength={11}
                        error={getFieldError(
                          formik.errors.beneficiaryMobileNumber,
                          formik.touched.beneficiaryMobileNumber,
                        )}
                      />
                    )}

                    <SizedBox height={16} />

                    <Row justifyContent="flex-start">
                      <Column xs={12} md={5}>
                        <Text variant="lighter">
                          <SelectBundleRadio>Select bundle</SelectBundleRadio>
                        </Text>
                      </Column>
                    </Row>

                    {activeTab === 1 && (
                      <TextField
                        label="Data Bundle"
                        placeholder="Select Data Bundle"
                        dropDown
                        dropDownOptions={dataPlans}
                        value={formik.values.bundleId}
                        onChange={(e) => {
                          formik.setFieldValue('bundleId', e.target.value);
                          formik.setFieldValue('amount', e.target.value);
                        }}
                        error={getFieldError(
                          formik.errors.bundleId,
                          formik.touched.bundleId,
                        )}
                      />
                    )}

                    {activeTab === 2 && (
                      <TextField
                        label="Data Bundle"
                        placeholder="Select Data Bundle"
                        dropDown
                        dropDownOptions={dataPlans}
                        value={formik.values.bundleId}
                        onChange={(e) => {
                          formik.setFieldValue('bundleId', e.target.value);
                          formik.setFieldValue('amount', e.target.value);
                        }}
                        error={getFieldError(
                          formik.errors.bundleId,
                          formik.touched.bundleId,
                        )}
                      />
                    )}

                    <SizedBox height={24} />

                    <SizedBox height={5} />

                    <Button type="submit" isLoading={loading} fullWidth>
                      Recharge Now
                    </Button>
                    {renderModals()}
                  </form>
                </>
              )}
            </Card>
          </Column>
        </Column>
      </PageBody>
    </>
  );
};
