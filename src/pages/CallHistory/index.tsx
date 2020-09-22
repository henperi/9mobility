import React from 'react';
import { useHistory } from 'react-router-dom';
// import * as Yup from 'yup';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';

import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';

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

export const CallHistory: React.FC = () => {
  const history = useHistory();
  const handleSubmit = () => {
    history.push('/call/history');
  };

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
        <form onSubmit={handleSubmit}>
          <Card
            fullWidth
            fullHeight
            padding="40px"
            style={{ minHeight: '300px' }}
          >
            <Column
              xs={12}
              sm={10}
              md={8}
              lg={6}
              xl={5}
              style={{ margin: '0 auto' }}
            >
              <SizedBox height={20} />
              <Text size={18} weight={700} alignment="center">
                We sent you an SMS with a code
              </Text>
              <SizedBox height={6} />
              <Text weight={300} alignment="center">
                To access your call history, kindly enter the OPT sent to your
                registered number
              </Text>
              <SizedBox height={36} />
              <TextField placeholder="Enter OTP" />
              <SizedBox height={36} />
              <Button type="submit" fullWidth>
                Continue
              </Button>
            </Column>
          </Card>
        </form>
      </Column>
    </PageBody>
  );
};
