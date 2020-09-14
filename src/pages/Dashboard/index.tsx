import React, { useState } from 'react';
import { PageBody } from '../../components/PageBody';
import { SizedBox } from '../../components/SizedBox';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Column } from '../../components/Column';
import { Card } from '../../components/Card';
import { useGlobalStore } from '../../store';
import { Button } from '../../components/Button';
import { Colors } from '../../themes/colors';
import { DropDownButton } from '../../components/Button/DropdownButton';
import { Scrollable } from '../../components/Scrollable';

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

  const [mobile, setmobile] = useState('08091234567A');

  return (
    <PageBody>
      <SizedBox height={40} />
      <Text>Hello {auth.user?.firstName}, Good morning</Text>
      <SizedBox height={24} />
      <Row useAppMargin>
        <Column xs={12} md={6} lg={4} xl={4} useAppMargin fullHeight>
          <Card fullWidth fullHeight>
            <Column fullHeight alignItems="space-between">
              <DropDownButton
                dropdownOptions={[
                  { id: '08091234567', name: '08091234567A' },
                  { id: '08091234567', name: '08091234567B' },
                ]}
                useDefaultName={false}
                variant="default"
                dropDownChange={(e) => setmobile(e.name)}
                style={{
                  minWidth: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: 'unset',
                }}
              >
                <Text size={18} color={Colors.darkGreen} weight={500}>
                  {mobile}
                </Text>
              </DropDownButton>
              <SizedBox height={20} />
              <Row>
                <Column xs={6}>
                  <Text>Airtime Balance</Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
                    ₦850.59
                  </Text>
                </Column>
                <Column xs={6}>
                  <Text>Data Balance</Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
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

        <Column xs={12} md={6} lg={4} xl={4} useAppMargin fullHeight>
          <Card fullWidth fullHeight>
            <Column fullHeight alignItems="space-between">
              <Text size={18} color={Colors.darkGreen} weight={500}>
                Subscribed services
              </Text>
              <SizedBox height={20} />
              <Row>
                <Column>
                  <Text>As of 11:04AM, 26th March 2019</Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
                    14 Services
                  </Text>
                </Column>
              </Row>
              <SizedBox height={35} />
              <Scrollable
                style={{ width: '95%', marginLeft: '2.5%' }}
                arrowStyles={{
                  width: '25px',
                  height: '25px',
                  padding: '5px',
                }}
              >
                <Card
                  style={{
                    background: '#EDF6F8',
                    minWidth: '92px',
                    marginRight: '2.5%',
                  }}
                >
                  <Column justifyContent="center">
                    <Text size={12} color={Colors.darkGreen} weight={700}>
                      MoreCredit
                    </Text>
                    <SizedBox height={7} />
                    <Text size={12} color={Colors.darkGreen} weight={500}>
                      N300
                    </Text>
                  </Column>
                </Card>
                <Card
                  style={{
                    background: '#EDF6F8',
                    minWidth: '92px',
                    marginRight: '2.5%',
                  }}
                >
                  <Column justifyContent="center">
                    <Text size={12} color={Colors.darkGreen} weight={700}>
                      MoreCredit
                    </Text>
                    <SizedBox height={7} />
                    <Text size={12} color={Colors.darkGreen} weight={500}>
                      N300
                    </Text>
                  </Column>
                </Card>
                <Card
                  style={{
                    background: '#EDF6F8',
                    minWidth: '92px',
                    marginRight: '2.5%',
                  }}
                >
                  <Column justifyContent="center">
                    <Text size={12} color={Colors.darkGreen} weight={700}>
                      MoreCredit
                    </Text>
                    <SizedBox height={7} />
                    <Text size={12} color={Colors.darkGreen} weight={500}>
                      N300
                    </Text>
                  </Column>
                </Card>
              </Scrollable>
              <SizedBox height={15} />
              <Row>
                <Button fullWidth>View all subscribed services</Button>
              </Row>
            </Column>
          </Card>
        </Column>
        <Column xs={12} md={6} lg={4} xl={4} useAppMargin fullHeight>
          <Card fullWidth fullHeight>
            <Column fullHeight alignItems="space-between">
              <Text size={18} color={Colors.darkGreen} weight={500}>
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
      <Scrollable
        arrowContainerStyle={{
          bottom: '100%',
          right: '0%',
          width: 'unset',
          height: 'unset',
        }}
        arrowStyles={{
          margin: '5px',
        }}
      >
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '3%',
          }}
        >
          <Column justifyContent="center">
            <Text size={12} color={Colors.darkGreen} weight={700}>
              MoreCredit
            </Text>
            <SizedBox height={7} />
            <Text size={12} color={Colors.darkGreen} weight={500}>
              N300
            </Text>
          </Column>
        </Card>
      </Scrollable>
    </PageBody>
  );
};
