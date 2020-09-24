import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useFormik } from 'formik';
import { useUrlQuery } from '../../customHooks/useUrlQuery';
import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { useLazyFetch } from '../../customHooks/useRequests';
import { Column } from '../../components/Column';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { SizedBox } from '../../components/SizedBox';
import { TableExample } from '../../components/Table';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError } from '../../utils/formikHelper';

interface CallHistoryResp {
  result: {
    responseCode: number,
    message: string;
    results: {
      recipientNumber: string;
      callDate: Date | string;
      timeSpent: string;
      status: number
      endDate: string;
      charge: string;
      type: string;
      id: string;
    }[];
  };
}

export const CallHistoryTable: React.FC = () => {
  // const history = useHistory();
  const query = useUrlQuery();
  const trackingId = query.get('trackingId');
  const [tableData, setTableData] = useState<(string | number)[][]>();
  // const [pageNumber] = useState(1);
  // const [pageSize] = useState(15);


  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required('This field is required'),
      endDate: Yup.date().required('This field is required'),
    }),
    onSubmit: async (formData) => {
      await getCallHistory()
    },
  });

  const date = {
    start: DateTime.fromISO(formik.values.startDate, {
      locale: 'fr',
    }).toLocaleString(),
    end: DateTime.fromISO(formik.values.endDate, {
      locale: 'fr',
    }).toLocaleString(),
  }

  console.log(date, 'thisis t')

  const [getCallHistory, { data, loading }] = useLazyFetch<
  CallHistoryResp
  >(`Mobility.Account/api/Airtime/getcallhistories/${trackingId}/${date.start}/${date.end}`);

  useEffect(() => {
    if (data?.result) {
      const tableResults = data.result.results.map((result, i) => {
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

  // const [pageNumber] = useState(1);
  // const [pageSize] = useState(15);

  useEffect(() => {
    //  get call history
    (async () => await getCallHistory())();
  }, [])

  const renderTable = () =>
    data?.result.results.length ? (
      <TableExample
        columns={['S/N', 'Phone Number', 'Type', 'Charge', 'Date', 'Time']}
        data={tableData}
      />
    ) : (
      <Text variant="lighter">No call histories at the moment</Text>
    );

  return (
    <Column>
      <Column>
        <form onSubmit={formik.handleSubmit}>
          <Card fullWidth fullHeight padding="28px">
            <Column md={6} style={{ marginLeft: '0', paddingRight: '1%' }}>
              <TextField
                label="Select Phone Number"
                placeholder="Select Phone"
                dropDown
                type="tel"
                minLength={11}
                maxLength={11}
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
            <Column fullHeight alignItems="center">
              {renderTable()}
            </Column>
          )}
        </Card>
      </Column>
    </Column>

  );
};
