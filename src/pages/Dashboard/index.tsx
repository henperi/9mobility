import React from 'react';
import { PageBody } from '../../components/PageBody';
import { SizedBox } from '../../components/SizedBox';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Column } from '../../components/Column';
import { Card } from '../../components/Card';
import { useGlobalStore } from '../../store';
import { Button } from '../../components/Button';
import { Scrollable } from '../../components/Scrollable';

import { ReactComponent as GetLoan } from '../../assets/images/getLoan.svg';
import { ReactComponent as StreamMovies } from '../../assets/images/streamMovies.svg';
import { ReactComponent as PlayMusic } from '../../assets/images/playMusic.svg';
import { ReactComponent as PlayGames } from '../../assets/images/playGames.svg';
import { ReactComponent as BuyPhone } from '../../assets/images/buyPhone.svg';
import { SimBalances } from './SimBalances';
import { SubscribedServices } from './SubscribedServices';

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
      <Text>Hello {auth.user?.firstName}, Good morning</Text>
      <SizedBox height={24} />
      <Row useAppMargin>
        <SimBalances />
        <SubscribedServices />
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
          margin: '0 0 15px 15px',
        }}
      >
        <Card
          style={{
            minWidth: '240px',
            marginRight: '2.5%',
            padding: '25px',
          }}
        >
          <Column justifyContent="flex-start">
            <GetLoan style={{ width: '100%' }} />
            <SizedBox height={24} />
            <Text weight={500}>
              Get a loan <br />
              in 60 seconds
            </Text>
            <SizedBox height={16} />
            <Button fullWidth outline>
              Apply Now
            </Button>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '2.5%',
            padding: '25px',
          }}
        >
          <Column justifyContent="flex-start">
            <StreamMovies style={{ width: '100%' }} />
            <SizedBox height={24} />
            <Text weight={500}>
              Stream movies, <br />
              shows & reality TV
            </Text>
            <SizedBox height={16} />
            <Button fullWidth outline variant="blackGrey">
              Apply Now
            </Button>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '2.5%',
            padding: '25px',
          }}
        >
          <Column justifyContent="flex-start">
            <PlayMusic style={{ width: '100%' }} />
            <SizedBox height={24} />
            <Text weight={500}>
              Play music <br /> & rock ringback tunes
            </Text>
            <SizedBox height={16} />
            <Button fullWidth outline variant="lightBlue">
              Apply Now
            </Button>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '2.5%',
            padding: '25px',
          }}
        >
          <Column justifyContent="flex-start">
            <PlayGames style={{ width: '100%' }} />
            <SizedBox height={24} />
            <Text weight={500}>
              Play &amp; <br />
              download games
            </Text>
            <SizedBox height={16} />
            <Button fullWidth outline variant="orange">
              Apply Now
            </Button>
          </Column>
        </Card>
        <Card
          style={{
            minWidth: '240px',
            marginRight: '2.5%',
            padding: '25px',
          }}
        >
          <Column justifyContent="flex-start">
            <BuyPhone style={{ width: '100%' }} />
            <SizedBox height={24} />
            <Text weight={500}>
              Buy smartphones <br />
              &amp; routers
            </Text>
            <SizedBox height={16} />
            <Button fullWidth outline>
              Apply Now
            </Button>
          </Column>
        </Card>
      </Scrollable>
    </PageBody>
  );
};
