import React from 'react';
import { PageBody } from '../../components/PageBody';
import { SizedBox } from '../../components/SizedBox';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Column } from '../../components/Column';
import { Card } from '../../components/Card';
import { useGlobalStore } from '../../store';
import { Button } from '../../components/Button';
import { Colors } from '../../themes/colors';

export interface OnboardingAuthResponse {
  result: {
    expiresIn: Date;
    accesssToken: string;
    firstName: string;
    lastName: string;
    email: string;
    hasWallet: boolean;
    walletAccount: string;
    refreshToken: string;
  };
  responseCode: number;
  message: string;
}

export const Dashboard: React.FC<any> = () => {
  const {
    state: { auth },
  } = useGlobalStore();

  return (
    <PageBody>
      <SizedBox height={40} />
      <Text>Hello {auth.user?.firstName}, Good morning</Text>
      <SizedBox height={24} />
      <Row useAppMargin>
        <Column xs={12} md={6} lg={4} xl={4} useAppMargin>
          <Card fullWidth>
            <Column>
              <Text size={18} color={Colors.darkGreen}>
                08091234567
              </Text>
              <SizedBox height={20} />
              <Row>
                <Column xs={6}>
                  <Text>Airtime Balance</Text>
                  <Text size={18} color={Colors.darkGreen}>
                    ₦850.59
                  </Text>
                </Column>
                <Column xs={6}>
                  <Text>Data Balance</Text>
                  <Text size={18} color={Colors.darkGreen}>
                    550MB
                  </Text>
                </Column>
              </Row>
              <SizedBox height={35} />
              <Text>
                You’re currently on MoreTalk. Call rate is 25k/sec to all
                networks after ₦25 spend.
              </Text>
              <SizedBox height={25} />
              <Row useAppMargin>
                <Column useAppMargin xs={6}>
                  <Button fullWidth>Airtime</Button>
                </Column>
                <Column useAppMargin xs={6}>
                  <Button fullWidth>Data</Button>
                </Column>
              </Row>
            </Column>
          </Card>
        </Column>

        <Column xs={12} md={6} lg={4} xl={4} useAppMargin>
          <Card fullWidth>
            <Column>
              <Text size={18} color={Colors.darkGreen}>
                Subscribed services
              </Text>
              <SizedBox height={20} />
              <Row>
                <Text>As of 11:04AM, 26th March 2019</Text>
                <Text>14 Services</Text>
              </Row>
              <SizedBox height={35} />
              <Row useAppMargin justifyContent="space-between">
                <Column useAppMargin xs={4}>
                  <Card style={{ background: 'grey' }} fullWidth />
                </Column>
                <Column useAppMargin xs={4}>
                  <Card style={{ background: 'grey' }} fullWidth />
                </Column>
                <Column useAppMargin xs={4}>
                  <Card style={{ background: 'grey' }} fullWidth />
                </Column>
              </Row>
              <SizedBox height={5} />
              <Row>
                <Button fullWidth>View all subscribed services</Button>
              </Row>
            </Column>
          </Card>
        </Column>
        <Column xs={12} md={6} lg={4} xl={4} useAppMargin>
          <Card fullWidth>
            <Column>
              <Text size={18} color={Colors.darkGreen}>
                Wallet
              </Text>

              <SizedBox height={35} />
              <Text>
                You preserntly don’t have a 9PSB wallet. Create a wallet to
                enjoy unlimited possibilities
              </Text>
              <SizedBox height={25} />
              <Button fullWidth>Create 9PSB account</Button>
            </Column>
          </Card>
        </Column>
      </Row>
      <SizedBox height={36} />
      <Text>Quick Services</Text>
      <SizedBox height={24} />
      <Row justifyContent="space-between">
        <Card style={{ minWidth: '240px' }} />
        <Card style={{ minWidth: '240px' }} />
        <Card style={{ minWidth: '240px' }} />
        <Card style={{ minWidth: '240px' }} />
        <Card style={{ minWidth: '240px' }} />
      </Row>
    </PageBody>
  );
};
