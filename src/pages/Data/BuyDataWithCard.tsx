import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { useHistory } from 'react-router-dom';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import masterCardLogo from '../../assets/images/mastercard-logo.png';
import verveLogo from '../../assets/images/verve-logo.png';
import visaLogo from '../../assets/images/visa-logo.png';
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
// import { SuccessBox } from '../../components/SuccessBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
import useRadioInput from '../../components/RadioInput/useRadioInput';
import { BundlesResp } from './Interface';
import { logger } from '../../utils/logger';
import { Spinner } from '../../components/Spinner';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';

interface SuccessResp {
  result: {
    paymentLink: string;
  };
  responseCode: number;
  message: string;
}

export const BuyDataWithCard: React.FC = () => {
  const { RadioInput: SelectBundleRadio } = useRadioInput(true);

  const [activeTab, setactiveTab] = useState(1);

  const [buyWithDebitCard, { loading, error }] = usePost<SuccessResp>(
    'Mobility.Account/api/data/BuyDataFromDebitCard',
  );

  const { mobileNumbers } = useGetMobileNumbers();

  const {
    data: bundlesData,
    error: bundlesError,
    loading: loadingBundles,
  } = useFetch<BundlesResp>('Mobility.Account/api/Data/GetBundle');

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
        value: option.cost,
      }));

      setDataPlans(plansResults);
    }
  }, [bundlesData]);

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
      dataBundle: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      amount: Yup.number().required('This field is required'),
      dataBundle: Yup.number().required('This field is required'),
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
    try {
      const response = await buyWithDebitCard(formik.values);

      if (response.data) {
        setShowConfirmationModal(false);

        window.open(response.data.result.paymentLink, '_blank');
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
            You are about to purchase &nbsp;
            <Text variant="darker">N{formik.values.amount}</Text> data for
            &nbsp;
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
                  Buy Data
                </Text>
                <Text size={14} color={Colors.grey} weight={200}>
                  Pay with debit/credit card
                </Text>
              </Column>
            </CardStyles.CardHeader>

            <Card showOverlayedDesign fullWidth padding="7% 20%">
              {loadingBundles ? (
                <SizedBox height={350}>
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

                  {bundlesError && (
                    <ErrorBox>
                      We are currently unable to fetch data bundles, please
                      reload or try again later
                    </ErrorBox>
                  )}

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

                    <Row justifyContent="flex-start">
                      <Column xs={12} md={5}>
                        <Text variant="lighter">
                          <SelectBundleRadio>Select bundle</SelectBundleRadio>
                        </Text>
                      </Column>
                    </Row>

                    <SizedBox height={16} />
                    {activeTab === 1 && (
                      <TextField
                        label="Data Bundle"
                        placeholder="Select Data Bundle"
                        dropDown
                        dropDownOptions={dataPlans}
                        value={formik.values.dataBundle}
                        onChange={(e) => {
                          formik.setFieldValue('dataBundle', e.target.value);
                          formik.setFieldValue('amount', e.target.value);
                        }}
                        error={getFieldError(
                          formik.errors.dataBundle,
                          formik.touched.dataBundle,
                        )}
                      />
                    )}

                    {activeTab === 2 && (
                      <TextField
                        label="Data Bundle"
                        placeholder="Select Data Bundle"
                        dropDown
                        dropDownOptions={dataPlans}
                        value={formik.values.dataBundle}
                        onChange={(e) => {
                          formik.setFieldValue('dataBundle', e.target.value);
                          formik.setFieldValue('amount', e.target.value);
                        }}
                        error={getFieldError(
                          formik.errors.dataBundle,
                          formik.touched.dataBundle,
                        )}
                      />
                    )}

                    <SizedBox height={20} />
                    <Button type="submit" isLoading={loading} fullWidth>
                      Pay with debit/credit card
                    </Button>
                    {renderModals()}
                  </form>

                  <SizedBox height={20} />

                  <Row justifyContent="center">
                    <img src={masterCardLogo} alt="masterCardLogo" />
                    <SizedBox width={20} />
                    <img src={verveLogo} alt="verveLogo" />
                    <SizedBox width={10} />
                    <img src={visaLogo} alt="visaLogo" />
                  </Row>
                </>
              )}
            </Card>
          </Column>
        </Column>
      </PageBody>
    </>
  );
};
