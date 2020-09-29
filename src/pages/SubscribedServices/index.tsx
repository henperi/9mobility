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
import { useFetch } from '../../customHooks/useRequests';
import { Spinner } from '../../components/Spinner';
import { generateShortId } from '../../utils/generateShortId';

export interface SubscribedServicesResp {
  result: [
    {
      id: string;
      name: string;
      description: string;
      icon: string;
      isRoamingEnabled: true;
      amount: string;
      frequency: string;
    },
  ];
  responseCode: number;
  message: string;
}

export const SubscribedServices: React.FC = () => {
  const { data, loading } = useFetch<SubscribedServicesResp>(
    'Mobility.Account/api/Services/GetSubscribedServices',
  );

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Row wrap useAppMargin>
          <Column useAppMargin xs={6} md={6} lg={4}>
            <Text size={32} weight={500}>
              Subscribed Services
            </Text>
            <SizedBox height={2} />
            <Text weight={100}>List of currently subscribed services</Text>
            <SizedBox height={10} />
          </Column>
          {loading ? (
            <SizedBox height={30}>
              <Spinner isFixed>Gathering your service information</Spinner>
            </SizedBox>
          ) : (
            <Column style={{ flexDirection: 'row' }} xs={8} md={3} lg={4}>
              <Column xs={2} md={2} lg={1} style={{ marginRight: '20px' }}>
                <Text size={65} style={{ lineHeight: '65px' }} weight={500}>
                  {data?.result.length}
                </Text>
              </Column>
              <Column alignItems="center" lg={1}>
                <Text>
                  <SizedBox height={15} />
                  Subscribed Services
                </Text>
              </Column>
            </Column>
          )}
        </Row>
        <SizedBox height={30} />
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Row useAppMargin>
        {loading && <Spinner isFixed />}

        {data?.result.map((item: any) => (
          <Column useAppMargin md={6} lg={3} fullHeight key={generateShortId()}>
            <Card
              fullWidth
              fullHeight
              style={{
                borderRadius: '2px 2px 0px 0px',
              }}
            >
              <SizedBox height={2} />
              <Text
                casing="sentenceCase"
                size={18}
                weight={500}
                color={Colors.lightGreen}
              >
                {item.name}
              </Text>
              <SizedBox height={8} />
              <Text casing="sentenceCase" variant="lighter">
                {`${item.frequency || 'Weekly'} Plan`}
              </Text>
              <SizedBox height={39} />
              <Text casing="sentenceCase" variant="lighter">
                {item.description}
              </Text>
            </Card>
            <Row
              style={{
                width: '100%',
                minHeight: '8px',
                borderRadius: '2px 2px 0px 0px',
                padding: '5px 20px',
                background:
                  'linear-gradient(130.24deg, #006848 0%, #B4C404 100%)',
              }}
            />
          </Column>
        ))}
      </Row>
    </PageBody>
  );
};
