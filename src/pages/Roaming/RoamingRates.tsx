import React from 'react';

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
import { useFetch, useLazyFetch } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { SuccessBox } from '../../components/SuccessBox';
import { logger } from '../../utils/logger';

interface SuccessResp {
  result: {
    id: number;
    countryId: number;
    operatorId: number;
    callRateWithinLocation: string;
    callRateToNigeria: string;
    receivingCallRate: string;
    smsRate: string;
    gprsRate: string;
  };
  responseCode: number;
  message: string;
}

export const RoamingRates: React.FC = () => {
  const [getRoamingRate, { loading, data, error }] = useLazyFetch<SuccessResp>(
    'Mobility.Account/api/Roaming/GetRoamingRate',
  );

  const {
    // loading: loadingRoamingOptions,
    data: roamingOptions,
    // error: errorRoamingOptions,
  } = useFetch<{
    result: {
      id: number;
      name: string;
    }[];
  }>('Mobility.Account/api/Roaming/GetRoamingOptions');

  const {
    // loading: loadingRoamingOptions,
    data: operators,
    // error: errorRoamingOptions,
  } = useFetch<{
    result: {
      id: number;
      name: string;
    }[];
  }>('Mobility.Account/api/Roaming/GetOperators');

  const {
    // loading: loadingRoamingOptions,
    data: countries,
    // error: errorRoamingOptions,
  } = useFetch<{
    result: {
      id: number;
      name: string;
      code: string;
    }[];
  }>('Mobility.Account/api/Countries/GetCountries');

  const formik = useFormik({
    initialValues: {
      roamingId: '',
      simType: '',
      countryId: '',
      operatorId: '',
    },
    validationSchema: Yup.object({
      roamingId: Yup.number().required('This field is required'),
      simType: Yup.number().required('This field is required'),
      countryId: Yup.number().required('This field is required'),
      operatorId: Yup.number().required('This field is required'),
    }),
    onSubmit: async (formData) => {
      handleRechargeWithPin();
    },
  });

  const handleRechargeWithPin = async () => {
    try {
      await getRoamingRate(formik.values);
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const getCountryName = (id: number) => {
    return countries?.result.find((country) => country.id === id)?.name;
  };

  const renderResults = () =>
    data?.result ? (
      <>
        <SizedBox height={20} />
        <Card fullWidth padding="4%">
          <Row useAppMargin>
            <Column xs={6} md={4} useAppMargin>
              <Text size={18} color={Colors.darkGreen}>
                {data?.result.callRateWithinLocation}
              </Text>
              <Text size={12} color={Colors.blackGrey}>
                Calls within location: {getCountryName(data.result.countryId)}
              </Text>
            </Column>
            <Column xs={6} md={4} useAppMargin>
              <Text size={18} color={Colors.darkGreen}>
                {data?.result.callRateToNigeria}
              </Text>
              <Text size={12} color={Colors.blackGrey}>
                Calls to Nigeria
              </Text>
            </Column>
            <Column xs={6} md={4} useAppMargin>
              <Text size={18} color={Colors.darkGreen}>
                {data?.result.receivingCallRate}
              </Text>
              <Text size={12} color={Colors.blackGrey}>
                Recieving calls
              </Text>
            </Column>

            <Column xs={6} md={4} useAppMargin>
              <Text size={18} color={Colors.darkGreen}>
                {data?.result.smsRate}
              </Text>
              <Text size={12} color={Colors.blackGrey}>
                SMS
              </Text>
            </Column>

            <Column xs={6} md={4} useAppMargin>
              <Text size={18} color={Colors.darkGreen}>
                {data?.result.gprsRate}
              </Text>
              <Text size={12} color={Colors.blackGrey}>
                GPRS
              </Text>
            </Column>
          </Row>
        </Card>
        <SizedBox height={20} />
      </>
    ) : null;

  /*
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
            You are about to purchase airtime for{' '}
            <Text variant="darker">{formik.values.roamingId}</Text> with a
            voucher pin of{' '}
            <Text variant="darker">{formik.values.voucherPin}</Text>
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
    */

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
                Roaming rates
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Rates in country visited & back to Nigeria
              </Text>
            </Column>
          </CardStyles.CardHeader>
          <Card showOverlayedDesign fullWidth padding="28px">
            {error && <ErrorBox>{error.message}</ErrorBox>}
            {data && <SuccessBox>{data.message}</SuccessBox>}
            <form onSubmit={formik.handleSubmit}>
              <Row useAppMargin>
                <Column useAppMargin md={6}>
                  <TextField
                    label="Roaming"
                    placeholder="Roaming Options"
                    dropDown
                    dropDownOptions={roamingOptions?.result.map((option) => ({
                      label: option.name,
                      value: option.id,
                    }))}
                    value={formik.values.roamingId}
                    onChange={(e) =>
                      formik.setFieldValue('roamingId', e.target.value)
                    }
                    error={getFieldError(
                      formik.errors.roamingId,
                      formik.touched.roamingId,
                    )}
                  />
                </Column>
                <Column useAppMargin md={6}>
                  <TextField
                    label="Country"
                    placeholder="Select Country"
                    dropDown
                    dropDownOptions={countries?.result
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((option) => ({
                        label: option.name,
                        value: option.id,
                      }))}
                    value={formik.values.countryId}
                    onChange={(e) =>
                      formik.setFieldValue('countryId', e.target.value)
                    }
                    error={getFieldError(
                      formik.errors.countryId,
                      formik.touched.countryId,
                    )}
                  />
                </Column>
                <Column useAppMargin md={6}>
                  <TextField
                    label="Your Plan"
                    placeholder="Postpaid/Prepaid"
                    dropDown
                    dropDownOptions={[
                      { label: 'Prepaid', value: 0 },
                      { label: 'Postpaid', value: 1 },
                    ]}
                    value={formik.values.simType}
                    onChange={(e) =>
                      formik.setFieldValue('simType', e.target.value)
                    }
                    error={getFieldError(
                      formik.errors.simType,
                      formik.touched.simType,
                    )}
                  />
                </Column>
                <Column useAppMargin md={6}>
                  <TextField
                    label="Operator"
                    placeholder="Select Operator"
                    dropDown
                    dropDownOptions={operators?.result.map((option) => ({
                      label: option.name,
                      value: option.id,
                    }))}
                    value={formik.values.operatorId}
                    onChange={(e) =>
                      formik.setFieldValue('operatorId', e.target.value)
                    }
                    error={getFieldError(
                      formik.errors.operatorId,
                      formik.touched.operatorId,
                    )}
                  />
                </Column>
              </Row>

              <SizedBox height={24} />
              <Button type="submit" isLoading={loading} fullWidth>
                Get Rate
              </Button>
              {renderResults()}
            </form>
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
