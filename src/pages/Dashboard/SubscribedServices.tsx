import { DateTime } from 'luxon';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { generateShortId } from '../../utils/generateShortId';

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

  const history = useHistory();

  const date = DateTime.fromISO(new Date().toISOString());

  return (
    <Column xs={12} md={6} lg={4} xl={4} useAppMargin fullHeight>
      <Card
        fullWidth
        fullHeight
        style={{ minHeight: '250px', padding: '28px' }}
      >
        {loading ? (
          <Spinner isFixed />
        ) : (
          <Column fullHeight alignItems="space-between">
            <Column>
              <Text size={18} color={Colors.darkGreen} weight={500}>
                Subscribed services
              </Text>
              <SizedBox height={20} />
              <Row>
                <Column>
                  <Text size={14}>
                    As of{' '}
                    {date.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
                  </Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
                    {data?.result.length}{' '}
                    {data?.result.length === 1 ? 'Service' : 'Services'}
                  </Text>
                </Column>
              </Row>
            </Column>
            {data?.result.length ? (
              <Scrollable
                hideScrollArrows={data.result.length <= 2}
                style={{ width: '95%', marginLeft: '2.5%' }}
                arrowStyles={{
                  width: '25px',
                  height: '25px',
                  padding: '5px',
                }}
              >
                {data?.result.map((service) => (
                  <Card
                    key={generateShortId()}
                    style={{
                      background: '#EDF6F8',
                      minWidth: '92px',
                      width: '130px',
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
            ) : null}
            <Row>
              <Button
                onClick={() => history.push('/subscribed-services')}
                fullWidth
              >
                View all subscribed services
              </Button>
            </Row>
          </Column>
        )}
      </Card>
    </Column>
  );
};
