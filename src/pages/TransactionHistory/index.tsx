import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
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

import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError, isFutureDate } from '../../utils/formikHelper';
import { Spinner } from '../../components/Spinner';
import { SimpleTable } from '../../components/Table';

interface TransactionHistorryResp {
  result: {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    nextPageUrl: string;
    prevPageUrl: string;
    results: {
      transactionAmount: string;
      createdDate: string;
      dateCreated: string;
      timeCreated: string;
      transactionType: number;
      transactionSource: number;
      id: number;
      transactionTypeName: string;
      transactionSourceName: string;
    }[];
  };
}

export const TransactionHistoryPage: React.FC = () => {
  // const history = useHistory();

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
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
      await getTransactionHistory();
    },
  });

  const [pageNumber] = useState(1);
  const [pageSize] = useState(15);

  const [getTransactionHistory, { data, loading }] = useLazyFetch<
    TransactionHistorryResp
  >('Mobility.Account/api/TransactionHistories/GetTransactionHistory', {
    startDate: DateTime.fromISO(formik.values.startDate, {
      locale: 'fr',
    }).toLocaleString(),
    endDate: DateTime.fromISO(formik.values.endDate, {
      locale: 'fr',
    }).toLocaleString(),
    pageNumber,
    pageSize,
  });

  const [tableData, setTableData] = useState<(string | number)[][]>();

  const getAmount = (amount: string) =>
    amount.endsWith('MB') ? amount : `N${amount}`;

  useEffect(() => {
    if (data?.result) {
      const tableResults = data.result.results.map((result, i) => {
        return Object.values({
          'S/N': i + 1,
          Type: result.transactionTypeName,
          Source: result.transactionSourceName,
          Amount: getAmount(result.transactionAmount),
          Date: DateTime.fromISO(result.createdDate, {
            locale: 'fr',
          }).toLocaleString(),
          Time: result.timeCreated,
        });
      });

      setTableData(tableResults);
    }
  }, [data]);

  const renderTable = () =>
    data?.result.results.length ? (
      <div style={{ margin: '-28px' }}>
        <SimpleTable
          columns={['S/N', 'Type', 'Source', 'Amount', 'Date', 'Time']}
          data={tableData}
        />
      </div>
    ) : (
      <Text variant="lighter">No transaction histories at the moment</Text>
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
            Transaction History
          </Text>
          <SizedBox height={5} />
          <Text weight={500} color={Colors.grey}>
            Your airtime spending history
          </Text>
          <SizedBox height={30} />
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Column>
        <form onSubmit={formik.handleSubmit}>
          <Card fullWidth fullHeight padding="28px">
            <Row useAppMargin>
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
                style={{ marginLeft: 'auto', marginTop: '20px' }}
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
            <Column fullHeight>{renderTable()}</Column>
          )}
        </Card>
      </Column>
    </PageBody>
  );
};
