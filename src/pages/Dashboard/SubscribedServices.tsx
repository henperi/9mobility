import React from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Column } from '../../components/Column';
import { Row } from '../../components/Row';
import { Scrollable } from '../../components/Scrollable';
import { SizedBox } from '../../components/SizedBox';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { useFetch } from '../../customHooks/useRequests';
import { Colors } from '../../themes/colors';

interface SubscribedServiceResp {
  result: {
    id: string;
    name: string;
    description: string;
    icon: string;
    isRoamingEnabled: boolean;
  }[];
}

export const SubscribedServices = () => {
  const { data, loading } = useFetch<SubscribedServiceResp>(
    'Mobility.Account/api/Services/GetSubscribedServices',
  );

  return (
    <Column xs={12} md={6} lg={4} xl={4} useAppMargin fullHeight>
      <Card
        fullWidth
        fullHeight
        style={{ minHeight: '300px', padding: '28px' }}
      >
        {loading ? (
          <Spinner isFixed />
        ) : (
          <Column fullHeight alignItems="space-between">
            <Text size={18} color={Colors.darkGreen} weight={500}>
              Subscribed services
            </Text>
            <SizedBox height={20} />
            <Row>
              <Column>
                <Text>As of 11:04AM, 26th March 2019</Text>
                <Text size={18} color={Colors.darkGreen} weight="bold">
                  {data?.result.length} Services
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
              {data?.result.map((service) => (
                <Card
                  key={service.id}
                  style={{
                    background: '#EDF6F8',
                    minWidth: '92px',
                    marginRight: '2.5%',
                    height: '100%',
                  }}
                >
                  <Column
                    justifyContent="center"
                    alignItems="center"
                    fullHeight
                  >
                    <Text
                      casing="titleCase"
                      size={12}
                      color={Colors.darkGreen}
                      weight={700}
                      alignment="center"
                    >
                      {service.name}
                    </Text>
                    <SizedBox height={7} />
                  </Column>
                </Card>
              ))}
            </Scrollable>
            <SizedBox height={15} />
            <Row>
              <Button fullWidth>View all subscribed services</Button>
            </Row>
          </Column>
        )}
      </Card>
    </Column>
  );
};
