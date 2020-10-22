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
import { Button } from '../../components/Button';
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

const billingOptions = [
  {
    id: 2,
    name: 'Per Second',
  },
  {
    id: 1,
    name: 'Per Minute',
  },
];

export const IDDRates: React.FC = () => {
  const [
    getInternationalCallRate,
    { data, error, loading: loadingRates },
  ] = useLazyFetch<SuccessResp>(
    'Mobility.Account/api/Roaming/GetInternationalCallRate',
  );
  const { data: countries } = useFetch<{
    result: {
      id: number;
      name: string;
      code: string;
    }[];
  }>('Mobility.Account/api/Countries/GetCountries');

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
    try {
      await getInternationalCallRate(formik.values);
    } catch (errorResp) {
      logger.log(errorResp);
    }
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
          }}
        >
          <Text size={13}>
            Calls within this location:{' '}
            <Text size={18} weight={600}>
              {data?.result?.callRateWithinLocation}
            </Text>
          </Text>
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
                      dropDownOptions={billingOptions?.map((option) => ({
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
