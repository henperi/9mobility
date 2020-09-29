import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Chart } from 'react-google-charts';

// import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { useLazyFetch } from '../../customHooks/useRequests';
// import { Spinner } from '../../components/Spinner';

import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
// import { logger } from '../../utils/logger';
import { getFieldError } from '../../utils/formikHelper';
import { Spinner } from '../../components/Spinner';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';

interface TransactionHistorryResp {
  result:
    | {
        amountUsed: string;
        dataUsage: string;
        time: string;
        usePurpose: string;
      }[]
    | null;
}

export const DataUsagePage: React.FC = () => {
  // const history = useHistory();
  const { mobileNumbers } = useGetMobileNumbers();

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
      mobileNumber: '',
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required('This field is required'),
      endDate: Yup.date().required('This field is required'),
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
    }),
    onSubmit: async (formData) => {
      await getDataUsageHistory();
    },
  });

  const start = DateTime.fromISO(formik.values.startDate, {
    locale: 'fr',
  }).toISODate();
  const end = DateTime.fromISO(formik.values.endDate, {
    locale: 'fr',
  }).toISODate();

  const [getDataUsageHistory, { data, loading }] = useLazyFetch<
    TransactionHistorryResp
  >(`Mobility.Account/api/Data/getdatausage/${start}/${end}`);

  const [barData, setbarData] = useState<(string | number)[][] | null>();

  useEffect(() => {
    if (data) {
      const result = data.result?.map((d) => [
        DateTime.fromISO(d.time, {
          locale: 'fr',
        }).toISODate(),
        parseInt(d.dataUsage, 10) / 1000,
      ]);

      setbarData(result);
    }
  }, [data]);

  const options = {
    title: 'Data Usage',
    hAxis: { title: 'Date/Time' },
    vAxis: { title: 'Data Used' },
    colors: ['#B4C404'],
    chartArea: { width: '50%' },
    isStacked: true,
  };

  const renderChart = () =>
    barData ? (
      <Card fullWidth>
        <Chart
          width="100%"
          height="300px"
          chartType="Bar"
          loader={<Spinner />}
          data={[['Date/Time', 'MB'], ...barData]}
          options={options}
        />
      </Card>
    ) : (
      <Text variant="lighter">No data histories at the moment</Text>
    );

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <SizedBox height={10} />
          <Text size={32} weight={500}>
            Data Usage
          </Text>
          <SizedBox height={5} />
          <Text weight={500} color={Colors.grey}>
            Your data spending history
          </Text>
          <SizedBox height={30} />
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Column>
        <form onSubmit={formik.handleSubmit}>
          <Card fullWidth fullHeight padding="28px">
            <Column md={6}>
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
            </Column>
            <SizedBox height={20} />
            <Row useAppMargin alignItems="flex-end">
              <Column useAppMargin md={4} lg={3}>
                <TextField
                  type="date"
                  label="Select Start Date"
                  placeholder="From"
                  {...formik.getFieldProps('startDate')}
                  error={getFieldError(
                    formik.errors.startDate,
                    formik.touched.startDate,
                  )}
                />
              </Column>
              <Column useAppMargin md={4} lg={3}>
                <TextField
                  type="date"
                  label="Select End Date"
                  placeholder="To"
                  {...formik.getFieldProps('endDate')}
                  error={getFieldError(
                    formik.errors.endDate,
                    formik.touched.endDate,
                  )}
                />
              </Column>

              <Column
                useAppMargin
                xs={6}
                md={4}
                lg={3}
                style={{ marginLeft: 'auto' }}
              >
                <Button type="submit" fullWidth>
                  Apply
                </Button>
              </Column>
            </Row>
          </Card>
        </form>
      </Column>

      <SizedBox height={10} />
      <Column>
        <Card
          fullWidth
          fullHeight
          padding="28px"
          style={{ minHeight: '200px' }}
        >
          {loading ? (
            <Spinner isFixed />
          ) : (
            <Column fullHeight>{renderChart()}</Column>
          )}
        </Card>
      </Column>
    </PageBody>
  );
};
