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
import { getFieldError } from '../../utils/formikHelper';

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

export const CallHistoryTable: React.FC<{ trackingId: string }> = (props) => {
  const [tableData, setTableData] = useState<(string | number)[][]>();
  const { trackingId } = props;

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
      await getCallHistory();
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

  // console.log(date);

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
