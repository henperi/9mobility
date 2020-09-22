import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';

import { ReactComponent as CreditCard } from '../../assets/images/creditCard.svg';
import { ReactComponent as NotePin } from '../../assets/images/notePin.svg';
import { ReactComponent as TransferForward } from '../../assets/images/transferForward.svg';
import { ReactComponent as MobileBorrow } from '../../assets/images/mobileBorrow.svg';
import { useFetch } from '../../customHooks/useRequests';
import { Spinner } from '../../components/Spinner';

interface AirtimeDataResp {
  result: {
    mobileNumber: string;
    airtimeModel: {
      balance: string;
      bonusBalance: string;
    };
    dataModel: {
      balance: string;
      bonusBalance: string;
      isRollOver: boolean;
      expiryDate: string;
      bonusExpiryDate: string;
    };
  };
}

export const DataPage: React.FC = () => {
  const history = useHistory();

  const { data, loading } = useFetch<AirtimeDataResp>(
    'Mobility.Account/api/Balance/AirtimeAndData',
  );

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <Text size={32} weight={500}>
            Data Recharge
          </Text>
          <SizedBox height={32} />
          <Row wrap useAppMargin>
            <Column useAppMargin xs={6} md={3} lg={2}>
              <Text size={12} weight={500} color={Colors.grey}>
                Data Balance
              </Text>

              <Text size={24} weight={500}>
                {loading ? <Spinner /> : data?.result.airtimeModel.balance}
              </Text>
              <SizedBox height={10} />

              <Text size={12} weight={500} color={Colors.grey}>
                Valid till 28/05/2019
              </Text>
              <SizedBox height={5} />

              <Text size={12} weight={500} color={Colors.grey}>
                Roll-Over Applicable
              </Text>
            </Column>
            <Column useAppMargin xs={6} md={3} lg={2}>
              <Text size={12} weight={500} color={Colors.grey}>
                Data Bonus
              </Text>
              <Text size={24} weight={500}>
                {loading ? <Spinner /> : data?.result.airtimeModel.bonusBalance}
              </Text>
              <SizedBox height={10} />

              <Text size={12} weight={500} color={Colors.grey}>
                Valid till 24/04/2019
              </Text>
              <SizedBox height={5} />

              <Text size={12} weight={500} color={Colors.grey}>
                Roll-Over Applicable
              </Text>
            </Column>
          </Row>
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Row useAppMargin>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/data/buy-with-debit-card')}
          >
            <CreditCard />
            <SizedBox height={60} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Buy with debit card
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Buy data using using your debit card or bank account
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/data/buy-with-airtime')}
          >
            <NotePin />
            <SizedBox height={50} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Buy with airtime
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Use your airtime balance to subscribe to any of our awesome data
              packages.
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/data/transfer')}
          >
            <TransferForward />
            <SizedBox height={50} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Transfer data
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Transfer data from your account to to friends and family with our
              s
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/data/borrow')}
          >
            <MobileBorrow />
            <SizedBox height={45} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Borrow data
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Did you run out of data during an important online process? No
              worries, we've got you covered.
            </Text>
          </Card>
        </Column>
      </Row>
    </PageBody>
  );
};
