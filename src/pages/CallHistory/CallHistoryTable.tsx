import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useUrlQuery } from '../../customHooks/useUrlQuery';
import { Card } from '../../components/Card';
import { useLazyFetch } from '../../customHooks/useRequests';
import { Column } from '../../components/Column';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { SizedBox } from '../../components/SizedBox';
import { SimpleTable } from '../../components/Table';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError, isFutureDate } from '../../utils/formikHelper';
import {
  Direction,
  getDateFromSelected,
  getIsoDate,
} from '../../utils/dateHelper';

interface CallHistoryResp {
  responseCode: number;
  message: string;
  result: {
    id: string;
    recipientNumber: string;
    type: string;
    charge: string;
    callDate: string;
    endDate: string;
    timeSpent: string;
    status: 1;
  }[];
}

const today = Date.now();
const initialDates = {
  startDate: DateTime.fromMillis(today, {
    locale: 'fr',
  })
    .minus({ days: 3 })
    .toISODate(),
  endDate: DateTime.fromMillis(today, {
    locale: 'fr',
  }).toISODate(),
};

export const CallHistoryTable: React.FC<{ trackingId: string }> = (props) => {
  const [tableData, setTableData] = useState<(string | number)[][]>();
  const { trackingId } = props;

  const [minDate, setMinDate] = useState<string>('');
  const [maxDate, setMaxDate] = useState<string>('');
  const [dateRangeError, setDateRangeError] = useState<string>('');

  const formik = useFormik({
    initialValues: initialDates,
    validationSchema: Yup.object({
      startDate: Yup.string()
        .test('StartDate', 'Future dates are not allowed', (value) => {
          return !isFutureDate(value);
        })
        .required('Start date is required'),
      endDate: Yup.string()
        .test('EndDate', 'Future dates are not allowed', (value) => {
          return !isFutureDate(value);
        })
        .required('End date is required'),
    }),
    onSubmit: async (formData) => {
      if (getDateFromSelected(maxDate, 2, Direction.Back) !== minDate) {
        setDateRangeError('You cannot view call history for more than 3 days');
      } else {
        await getCallHistory();
      }
    },
  });

  const date = {
    start: DateTime.fromISO(formik.values.startDate, {
      locale: 'fr',
    }).toISODate(),
    end: DateTime.fromISO(formik.values.endDate, {
      locale: 'fr',
    }).toISODate(),
  };

  const [getCallHistory, { data, loading }] = useLazyFetch<CallHistoryResp>(
    `Mobility.Account/api/Airtime/getcallhistories/${trackingId}/${date.start}/${date.end}`,
  );

  useEffect(() => {
    if (data?.result) {
      const tableResults = data.result.map((result, i) => {
        return Object.values({
          'S/N': i + 1,
          'Phone Number': result.recipientNumber,
          Type: result.type,
          Charge: result.charge,
          Date: DateTime.fromISO(result.endDate, {
            locale: 'fr',
          }).toLocaleString(),
          Time: result.timeSpent,
        });
      });

      setTableData(tableResults);
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
    const dateNow = getIsoDate(new Date().toString()).replace(/-/g, '/');

    setMinDate(getDateFromSelected(dateNow, 2, Direction.Back));
    formik.setFieldValue(
      'startDate',
      getDateFromSelected(dateNow, 2, Direction.Back),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTable = () =>
    tableData?.length ? (
      <div style={{ margin: '-28px' }}>
        <SimpleTable
          columns={['S/N', 'Phone Number', 'Type', 'Charge', 'Date', 'Time']}
          data={tableData}
        />
      </div>
    ) : (
      <Text variant="lighter">No call histories at the moment</Text>
    );

  return (
    <Column>
      <Column>
        <form onSubmit={formik.handleSubmit}>
          <Card fullWidth fullHeight padding="28px">
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
                style={{ marginLeft: 'auto' }}
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
            <Column fullHeight alignItems="center">
              {renderTable()}
            </Column>
          )}
        </Card>
      </Column>
    </Column>
  );
};
