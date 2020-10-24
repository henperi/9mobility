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
import { BundlesResp, emptyError, IError } from './Interface';
import useRadioInput from '../../components/RadioInput/useRadioInput';
import { logger } from '../../utils/logger';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { Spinner } from '../../components/Spinner';
import { DropDownButton } from '../../components/Button/DropdownButton';
import { useSimStore } from '../../store/simStore';

interface SuccessResp {
  responseCode: number;
  message: string;
}

export const BuyDataWithAirtime: React.FC = () => {
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

  const {
    state: { sim },
  } = useSimStore();

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
      formik.setFieldValue('mobileNumber', '');
      formik.setFieldValue('beneficiaryMobileNumber', '');
      return setactiveTab(2);
    }
    if (sim.secondarySim) {
      formik.setFieldValue('mobileNumber', sim.secondarySim);
      formik.setFieldValue('beneficiaryMobileNumber', sim.secondarySim);
    } else if (mobileNumbers?.length) {
      formik.setFieldValue('mobileNumber', mobileNumbers[0].value);
      formik.setFieldValue('beneficiaryMobileNumber', mobileNumbers[0].value);
    }

    return setactiveTab(1);
  };

  useEffect(() => {
    if (sim.secondarySim) {
      formik.setFieldValue('mobileNumber', sim.secondarySim);
      formik.setFieldValue('beneficiaryMobileNumber', sim.secondarySim);
    } else if (mobileNumbers?.length) {
      formik.setFieldValue('mobileNumber', mobileNumbers[0].value);
      formik.setFieldValue('beneficiaryMobileNumber', mobileNumbers[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumbers, sim]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [buyDataError, setBuyDataError] = useState<IError>(emptyError);

  const getDataCategory = (bundleID: string) => {
    const allBundles = bundlesData?.result;
    const bundleCategory = allBundles?.filter(
      (b) => Number(b.dataPlanId) === Number(bundleID),
    )[0].categoryName;
    return bundleCategory;
  };

  const handleBuyDataWithAirtime = async () => {
    try {
      const response = await buyDataWithAirtime({
        ...formik.values,
        dataCategory: getDataCategory(formik.values.bundleId),
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

  useEffect(() => {
    if (error) {
      setBuyDataError(error);
    }
  }, [error]);

  const DataPurchaseError = buyDataError.message && (
    <ErrorBox>{buyDataError.message}</ErrorBox>
  );

  const renderModals = () => (
    <>
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setBuyDataError(emptyError);
        }}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {DataPurchaseError}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You are about to purchase data for &nbsp;
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
                onClick={() => {
                  setShowConfirmationModal(false);
                  setBuyDataError(emptyError);
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
                  {data && <SuccessBox>{data.message}</SuccessBox>}

                  <form onSubmit={formik.handleSubmit}>
                    {activeTab === 1 && (
                      <DropDownButton
                        dropdownOptions={mobileNumbers}
                        useDefaultName={false}
                        variant="default"
                        fullWidth
                        type="button"
                        style={{
                          minWidth: '150px',
                          display: 'flex',
                          padding: '10px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          minHeight: 'unset',
                          background: `#FBFBFB`,
                          border: `solid 1px ${Colors.grey}`,
                        }}
                      >
                        <Text size={18} color={Colors.darkGreen} weight={500}>
                          {(sim && sim.secondarySim) ||
                            (mobileNumbers && mobileNumbers[0]?.value)}
                        </Text>
                      </DropDownButton>
                    )}
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
