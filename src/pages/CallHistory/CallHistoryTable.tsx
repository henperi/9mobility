import React from 'react';

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

import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { getFieldError } from '../../utils/formikHelper';

// interface TransactionHistorryResp {
//   result: {
//     pageNumber: number;
//     pageSize: number;
//     totalNumberOfPages: number;
//     totalNumberOfRecords: number;
//     nextPageUrl: string;
//     prevPageUrl: string;
//     results: {
//       transactionAmount: string;
//       createdDate: Date | string;
//       dateCreated: string;
//       timeCreated: string;
//       transactionType: number;
//       transactionSource: number;
//       id: number;
//     }[];
//   };
// }

export const CallHistoryTable: React.FC = () => {
  // const history = useHistory();

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
      // await getTransactionHistory();
    },
  });

  // const [pageNumber] = useState(1);
  // const [pageSize] = useState(15);

  // const renderTable = () =>
  //   data?.result.results.length ? (
  //     <>
  //       <Text color={Colors.darkGreen} weight={700} variant="lighter">
  //         Table Data
  //       </Text>
  //     </>
  //   ) : (
  //     <Text variant="lighter">No transaction histories at the moment</Text>
  //   );

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <SizedBox height={10} />
          <Text size={32} weight={500}>
            Call History
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
          {/* {loading ? (
            <Spinner isFixed />
          ) : (
            <Column fullHeight alignItems="center">
              {renderTable()}
            </Column>
          )} */}
        </Card>
      </Column>
    </PageBody>
  );
};
