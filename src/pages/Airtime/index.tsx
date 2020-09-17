import React from 'react';
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

export const AirtimePage: React.FC = () => {
  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <Text size={32} weight={500}>
            Airtime
          </Text>
          <SizedBox height={32} />
          <Row wrap useAppMargin>
            <Column useAppMargin xs={6} md={3} lg={2}>
              <Text size={12} weight={500} color={Colors.grey}>
                Airtime Balance
              </Text>
              <Text size={24} weight={500}>
                ₦850.59
              </Text>
            </Column>
            <Column useAppMargin xs={6} md={3} lg={2}>
              <Text size={12} weight={500} color={Colors.grey}>
                Airtime Bonus
              </Text>
              <Text size={24} weight={500}>
                ₦2,000
              </Text>
            </Column>
          </Row>
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Row useAppMargin>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card fullWidth fullHeight>
            <CreditCard />
            <SizedBox height={60} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Buy with debit card
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Buy airtime using debit card or bank account
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card fullWidth fullHeight>
            <NotePin />
            <SizedBox height={50} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Recharge with PIN
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Buy airtime using debit card or bank account
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card fullWidth fullHeight>
            <TransferForward />
            <SizedBox height={50} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Transfer airtime
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Buy airtime using debit card or bank account
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card fullWidth fullHeight>
            <MobileBorrow />
            <SizedBox height={45} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Borrow airtime
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Buy airtime using debit card or bank account
            </Text>
          </Card>
        </Column>
      </Row>
    </PageBody>
  );
};
