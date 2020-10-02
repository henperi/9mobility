import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { Card } from '../../components/Card';
import { BackButton } from '../../components/BackButton';
import { TextField } from '../../components/TextField';
import { getFieldError } from '../../utils/formikHelper';
import { useFetch, useLazyFetch } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { Row } from '../../components/Row';
import { rem } from '../../utils/rem';
import { Button } from '../../components/Button';

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

export const IDDRates: React.FC = () => {
  const [getRoamingRate, { data, error, loading: loadingRates }] = useLazyFetch<
    SuccessResp
  >('Mobility.Account/api/Roaming/GetRoamingRate');
  const { data: countries } = useFetch<{
    result: {
      id: number;
      name: string;
      code: string;
    }[];
  }>('Mobility.Account/api/Countries/GetCountries');

  const { data: billingOptions } = useFetch<{
    result: {
      id: number;
      name: string;
    }[];
  }>('Mobility.Account/api/Roaming/GetBillingOptions');

  const formik = useFormik({
    initialValues: {
      countryId: '',
      billingOptionId: '',
    },
    validationSchema: Yup.object({
      countryId: Yup.number().required('This field is required'),
      billingOptionId: Yup.number().required('This field is required'),
    }),
    onSubmit: async () => {
      getIDDRates();
    },
  });

  const getIDDRates = async () => {
    getRoamingRate(formik.values);
  };

  const renderResults = () =>
    data?.result ? (
      <>
        <SizedBox height={20} />
        <Card
          fullWidth
          padding="4%"
          style={{
            border: `solid 1px ${Colors.darkGreen}`,
            minHeight: rem(100),
          }}
        >
          <Text size={18} weight="600">
            {data?.result?.callRateWithinLocation}
          </Text>
          <SizedBox height={5} />
          <Text size={13}>Calls within location:</Text>
          <SizedBox height={10} />

          <Text size={18} weight="600">
            {data?.result?.callRateToNigeria}
          </Text>
          <SizedBox height={5} />
          <Text size={13}>Calls rate to Nigeria:</Text>
          <SizedBox height={10} />

          <Text size={18} weight="600">
            {data?.result?.receivingCallRate}
          </Text>
          <SizedBox height={5} />
          <Text size={13}>Receiving call rate:</Text>
          <SizedBox height={10} />
        </Card>
        <SizedBox height={20} />
      </>
    ) : null;

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
                  International call(IDD) rates
                </Text>
                <Text size={14} color={Colors.grey} weight={200}>
                  Rates in country visited &amp; back to Nigeria
                </Text>
              </Column>
            </CardStyles.CardHeader>
            <Card showOverlayedDesign fullWidth padding="5% 5%">
              {error && <ErrorBox>{error.message}</ErrorBox>}
              <form onSubmit={formik.handleSubmit}>
                <Row useAppMargin>
                  <Column useAppMargin md={6}>
                    <TextField
                      label="Billing"
                      placeholder="Billing Options"
                      dropDown
                      dropDownOptions={billingOptions?.result.map((option) => ({
                        label: option.name,
                        value: option.id,
                      }))}
                      value={formik.values.billingOptionId}
                      onChange={(e) =>
                        formik.setFieldValue('billingOptionId', e.target.value)
                      }
                      error={getFieldError(
                        formik.errors.billingOptionId,
                        formik.touched.billingOptionId,
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
                </Row>
                <SizedBox height={24} />
                <Button type="submit" isLoading={loadingRates} fullWidth>
                  Get Rate
                </Button>
                {renderResults()}
              </form>
            </Card>
          </Column>
        </Column>
      </PageBody>
    </>
  );
};
