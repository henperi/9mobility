import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';

import packageAdvisor from '../../assets/images/packageAdvisor.svg';
import { useFetch } from '../../customHooks/useRequests';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { AsyncImage } from '../../components/AsyncImage';
import { SinglePlan } from './SinglePlan';
import { useGetActivePlan } from '../../customHooks/useGetActivePlan';

export interface ActivePlan {
  result: {
    id: string;
    name: string;
    description: string;
    icon: string;
    isRoamingEnabled: boolean;
    amount: string;
    frequency: string;
  };
}

export const PrepaidPlansPage: React.FC = () => {
  const { data, loading } = useGetActivePlan();

  const { data: allPlans, loading: allPlansLoading } = useFetch<{
    result: ActivePlan['result'][];
  }>('Mobility.Account/api/Plans/GetAllPlans');

  const [selectedPlan, setSelectedPlan] = useState<ActivePlan['result']>();

  if (selectedPlan && allPlans) {
    return <SinglePlan plan={selectedPlan} allPlans={allPlans.result} />;
  }

  return (
    <PageBody>
      {loading || allPlansLoading ? (
        <SizedBox height={30}>
          <Spinner isFixed>Gathering your plan information</Spinner>
        </SizedBox>
      ) : (
        <>
          <CardStyles.CardHeader
            style={{ height: '100%', position: 'relative', padding: '28px' }}
          >
            <img src={appLogoBig} alt="appLogoBig" />
            <Card
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                minHeight: 'fit-content',
                transform: 'translateY(-50%)',
                width: '280px',
                padding: '15px',
              }}
            >
              <Row wrap justifyContent="space-between">
                <img style={{ all: 'unset' }} src={packageAdvisor} alt="" />
                <Column xs={9}>
                  <Text color={Colors.blackGrey} weight={600}>
                    Package Advisor
                  </Text>
                  <Text color={Colors.blackGrey} size={12}>
                    Can help you choose the package that’s right for you
                  </Text>
                </Column>
              </Row>
            </Card>

            <Column>
              <Text size={32} weight={500}>
                Prepaid Plans
              </Text>
              <SizedBox height={32} />

              <Text weight={100}>Current Plan</Text>
              <SizedBox height={10} />
              {loading ? (
                <SizedBox height={30}>
                  <Spinner isFixed>Gathering your plan information</Spinner>
                </SizedBox>
              ) : (
                <Row alignItems="center">
                  <Text weight={900} casing="lowercase">
                    {data?.result.name}
                  </Text>
                  <Button
                    variant="secondary"
                    style={{
                      marginLeft: '10px',
                      minHeight: 'fit-content',
                      padding: '5px 20px',
                    }}
                  >
                    Manage Plan
                  </Button>
                </Row>
              )}
            </Column>
          </CardStyles.CardHeader>
          <SizedBox height={40} />
          <Row useAppMargin>
            {!allPlans && allPlansLoading && <Spinner isFixed />}

            {allPlans?.result.map((plan) => (
              <Column
                useAppMargin
                md={6}
                lg={4}
                xl={3}
                fullHeight
                key={plan.id}
              >
                <Card
                  fullWidth
                  fullHeight
                  onClick={() => setSelectedPlan(plan)}
                >
                  <AsyncImage
                    src={`images/${plan.icon}`}
                    alt={plan.name}
                    style={{ width: 'fit-content' }}
                  />
                  <SizedBox height={60} />
                  <Text size={18} weight={500} color={Colors.lightGreen}>
                    {plan.name}
                  </Text>
                  <SizedBox height={8} />
                  <Text casing="sentenceCase" variant="lighter">
                    {plan.description}
                  </Text>
                </Card>
              </Column>
            ))}
          </Row>
        </>
      )}
    </PageBody>
  );
};
