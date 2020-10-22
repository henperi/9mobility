import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Chart } from 'react-google-charts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { SizedBox } from '../../components/SizedBox';
import { useLazyFetch } from '../../customHooks/useRequests';

import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError, isFutureDate } from '../../utils/formikHelper';
import { Spinner } from '../../components/Spinner';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { ValidateOTP } from '../../components/ValidateOTP';
import {
  Direction,
  getDateDiff,
  getDateFromSelected,
  getIsoDate,
} from '../../utils/dateHelper';
import { logger } from '../../utils/logger';

interface DataHistorryResp {
  result:
    | {
        amountUsed: string;
        dataUsage: string;
        time: string;
        usePurpose: string;
      }[]
    | null;
}

// const today = Date.now();
// const initialDates = {
//   startDate: DateTime.fromMillis(today, {
//     locale: 'fr',
//   })
//     .minus({ days: 3 })
//     .toISODate(),
//   endDate: DateTime.fromMillis(today, {
//     locale: 'fr',
//   }).toISODate(),
// };

export const DataUsagePage: React.FC = () => {
  const { mobileNumbers } = useGetMobileNumbers();
  const [minDate, setMinDate] = useState<string>('');
  const [maxDate, setMaxDate] = useState<string>('');
  const [dateRangeError, setDateRangeError] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
      mobileNumber: '09081013644',
    },
    validationSchema: Yup.object({
      startDate: Yup.string()
        .required('Start date is required')
        .test('startDate', 'Future dates are not allowed', (value) => {
          return !isFutureDate(value);
        }),
      endDate: Yup.string()
        .required('End date is required')
        .test('endDate', 'Future dates are not allowed', (value) => {
          return !isFutureDate(value);
        }),
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
    }),
    onSubmit: async (formData) => {
      loadHistory();
    },
  });

  const [getDataUsageHistory, { data, loading, error }] = useLazyFetch<
    DataHistorryResp
  >(`Mobility.Account/api/Data/getdatausage/${minDate}/${maxDate}`);

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

  useEffect(() => {
    if (minDate) {
      // calculate the maximum date from the minimum
      const maxDateAllowed = getDateFromSelected(minDate, 2, Direction.Forward);

      setMaxDate(maxDateAllowed);
      formik.setFieldValue('endDate', maxDateAllowed);
      setDateRangeError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDate]);

  useEffect(() => {
    const today = getIsoDate(new Date().toString()).replace(/-/g, '/');

    setMinDate(getDateFromSelected(today, 2, Direction.Back));
    formik.setFieldValue(
      'startDate',
      getDateFromSelected(today, 2, Direction.Back),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (maxDate) {
      loadHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxDate]);

  useEffect(() => {
    if (mobileNumbers?.length) {
      formik.setFieldValue('mobileNumber', mobileNumbers[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumbers?.length]);

  const options = {
    title: 'Data Usage',
    hAxis: { title: 'Date/Time' },
    vAxis: { title: 'Data Used' },
    colors: ['#B4C404'],
    chartArea: { width: '50%' },
    isStacked: true,
  };

  const loadHistory = async () => {
    const dateDiff = getDateDiff(minDate, maxDate);

    if (dateDiff > 2) {
      setDateRangeError('You cannot view transactions for more than 3 days');
    } else if (dateDiff < 0) {
      setDateRangeError('Invalid date range selection');
    } else {
      try {
        await getDataUsageHistory();
      } catch (errorResp) {
        logger.log(errorResp);
      }
    }
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
      <Text variant="lighter">
        {error?.message || `No data histories between at the moment`}
      </Text>
    );

  return (
    <>
      <Column>
        <form onSubmit={formik.handleSubmit}>
          <Card fullWidth fullHeight padding="28px">
            {/* <Column md={6}>
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
            <SizedBox height={20} /> */}
            <Row useAppMargin alignItems="center">
              <Column useAppMargin md={4} lg={3}>
                <TextField
                  type="date"
                  label="Select Start Date"
                  placeholder="From"
                  name="startDate"
                  value={minDate}
                  onChange={(e) => {
                    setMinDate(e.target.value);
                    formik.setFieldValue('startDate', e.target.value);
                  }}
                  error={getFieldError(
                    formik.errors.startDate,
                    formik.touched.startDate,
                  )}
                  disabled={loading}
                />
              </Column>
              <Column useAppMargin md={4} lg={3}>
                <TextField
                  type="date"
                  label="Select End Date"
                  placeholder="To"
                  name="endDate"
                  value={maxDate}
                  onChange={(e) => {
                    setMaxDate(e.target.value);
                    formik.setFieldValue('endDate', e.target.value);
                  }}
                  error={getFieldError(
                    formik.errors.endDate,
                    formik.touched.endDate,
                  )}
                  disabled={loading}
                />
              </Column>

              <Column
                useAppMargin
                xs={6}
                md={4}
                lg={3}
                style={{ marginLeft: 'auto', marginBottom: '12px' }}
              >
                <Button type="submit" fullWidth>
                  Apply
                </Button>
              </Column>
              <Column useAppMargin md={12}>
                {dateRangeError && (
                  <Text variant="lighter">{dateRangeError}</Text>
                )}
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
    </>
  );
};

export const ValidateDataUsage = () => (
  // <DataUsagePage />
  <ValidateOTP
    title="Data Usage"
    subtitle="Your data spending history"
    screen={DataUsagePage}
  />
);
