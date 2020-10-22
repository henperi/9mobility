import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';

import { ReactComponent as RoamingIcon } from '../../assets/images/phone-web.svg';
import { ReactComponent as TelephoneIcon } from '../../assets/images/telephone.svg';
import { ReactComponent as ShoppingIcon } from '../../assets/images/shopping.svg';
import { useFetch } from '../../customHooks/useRequests';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';

export const Roaming: React.FC = () => {
  const { data, loading } = useFetch<{
    result: boolean;
  }>('Mobility.Account/api/Roaming/GetIsRoamingEnabledValue');
  const history = useHistory();

  const match = useRouteMatch();

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />
        <SizedBox height={20} />
        <Row useAppMargin>
          <Column
            useAppMargin
            xs={3}
            md={1}
            lg={1}
            fullHeight
            alignItems="center"
          >
            <RoamingIcon />
          </Column>
          <Column useAppMargin xs={9}>
            <Text size={24}>Roaming</Text>
            <SizedBox height={5} />

            {loading ? (
              <SizedBox height={30}>
                <Spinner isFixed>Getting your roaming information</Spinner>
              </SizedBox>
            ) : (
              <Button
                variant="secondary"
                style={{
                  minHeight: 'fit-content',
                  padding: '5px 20px',
                }}
                isLoading={loading}
              >
                Roaming {data?.result ? 'enabled' : 'disabled'}
              </Button>
            )}
          </Column>
        </Row>
        <SizedBox height={20} />
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Row useAppMargin>
        <Column useAppMargin md={6} lg={4} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/roaming/idd-rates')}
          >
            <RoamingIcon title="Check for Int'l call rates (IDD)" />
            <SizedBox height={60} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Check for Int’l call rates (IDD)
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              Find out how much it’ll cost you to call abroad.
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={4} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push(`${match.path}/rates`)}
          >
            <TelephoneIcon title="Get Roaming rates" />
            <SizedBox height={60} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Get Roaming rates
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              Enjoy best roaming rates & offers in over 160 countries worldwide.
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={4} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/roaming/buy-bundle')}
          >
            <ShoppingIcon title="Buy roaming internet bundles" />
            <SizedBox height={60} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Buy roaming internet bundles
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              Buy a data plan for use anywhere in the world
            </Text>
          </Card>
        </Column>
      </Row>
    </PageBody>
  );
};
