import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { DropDownButton } from '../../components/Button/DropdownButton';
import { Card } from '../../components/Card';
import { Column } from '../../components/Column';
import { Row } from '../../components/Row';
import { SizedBox } from '../../components/SizedBox';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { useLazyFetch } from '../../customHooks/useRequests';
import { Colors } from '../../themes/colors';
import { useGetActivePlan } from '../../customHooks/useGetActivePlan';
import { ReactComponent as RefreshIcon } from '../../assets/images/refreshIcon.svg';
import { logger } from '../../utils/logger';
import { useSimStore } from '../../store/simStore';
import { setSecondaryNumber } from '../../store/simModules/simNumbers/actions';

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

interface AirtimeDataResp {
  result: {
    mobileNumber: string;
    airtimeModel: {
      balance: string;
      bonusBalance: string;
      subscriberType: 'PREPAID' | 'POSTPAID' | 'HYBRID';
      creditLimit: string;
      creditUsage: string;
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

export const SimBalances: React.FC = (props) => {
  const { mobileNumbers } = useGetMobileNumbers();
  const [activePlan, setActivePlan] = useState<ActivePlan>();

  const {
    state: { sim },
    dispatch,
  } = useSimStore();

  const [getAirtime, { data, loading }] = useLazyFetch<AirtimeDataResp>(
    `Mobility.Account/api/Balance/AirtimeAndData/${sim.secondarySim}`,
  );

  const [
    getActivePlan,
    { data: lazyActivePlanData, loading: lazyActivePlanLoading },
  ] = useLazyFetch<ActivePlan>(
    `Mobility.Account/api/Plans/GetActivePlan?mobile=${sim.secondarySim}`,
  );

  const [airtimeData, setAirtimeData] = useState<
    null | AirtimeDataResp['result']
  >();

  const getAirtimeRef = useRef(getAirtime);

  useEffect(() => {
    (async () => {
      try {
        await getAirtimeRef.current();
      } catch (e) {
        // console.log('object', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (data) {
      setAirtimeData(data.result);
    }
  }, [data]);

  const handelGetAirtime = useCallback(() => {
    try {
      getAirtime();
    } catch (e) {
      logger.log(e);
    }
  }, [getAirtime]);

  const handelGetActivePlan = useCallback(() => {
    try {
      getActivePlan();
    } catch (e) {
      logger.log(e);
    }
  }, [getActivePlan]);

  useEffect(() => {
    if (sim.secondarySim) {
      handelGetAirtime();
      handelGetActivePlan();
    }
  }, [handelGetAirtime, handelGetActivePlan, sim.secondarySim]);

  const history = useHistory();

  const {
    data: activePlanData,
    loading: activePlanLoading,
    error: activePlanError,
  } = useGetActivePlan();

  useEffect(() => {
    if (activePlanData) {
      setActivePlan(activePlanData);
    }
  }, [activePlanData]);

  useEffect(() => {
    if (lazyActivePlanData) {
      setActivePlan(lazyActivePlanData);
    }
  }, [lazyActivePlanData]);

  const renderActivePlan = () =>
    activePlan?.result.name ? (
      <Text weight={100} size={14} variant="lighter">
        <Text casing="capitalize" weight={500}>
          {activePlan?.result.name}:{' '}
        </Text>
        {activePlan?.result.description}
      </Text>
    ) : (
      <Text weight={100} size={14} variant="lighter">
        {activePlanError?.message ||
          'You dont have an active plan at the moment'}
      </Text>
    );

  const isHybrid = () => data?.result.airtimeModel.subscriberType === 'HYBRID';

  const isPostpaid = () =>
    data?.result.airtimeModel.subscriberType === 'POSTPAID';

  const isPrepaid = () =>
    data?.result.airtimeModel.subscriberType === 'PREPAID';

  const isHybridOrPostpaid = () => {
    return isPostpaid() || isHybrid();
  };

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
              <Row justifyContent="space-between" alignItems="center">
                <DropDownButton
                  dropdownOptions={mobileNumbers}
                  useDefaultName={false}
                  variant="default"
                  dropDownChange={(e) => {
                    dispatch(setSecondaryNumber(e.value));
                  }}
                  style={{
                    minWidth: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 'unset',
                    paddingLeft: 0,
                  }}
                >
                  <Text size={18} color={Colors.darkGreen} weight={500}>
                    {sim.secondarySim ||
                      (mobileNumbers && mobileNumbers[0].value)}
                  </Text>
                </DropDownButton>
                <RefreshIcon
                  onClick={() => {
                    handelGetAirtime();
                    if (sim.secondarySim) {
                      handelGetActivePlan();
                    }
                  }}
                />
              </Row>
              <SizedBox height={20} />
              <Row>
                {isHybridOrPostpaid() && (
                  <Column xs={6} md={isHybrid() ? 4 : 6}>
                    <Text weight={100} size={12} variant="lighter">
                      Credit Usage
                    </Text>
                    <Text size={18} color={Colors.darkGreen} weight="bold">
                      {airtimeData?.airtimeModel.creditUsage}
                    </Text>
                    {isPostpaid() && (
                      <Text weight={100} size={12} variant="lighter">
                        Credit Limit: {airtimeData?.airtimeModel.creditLimit}
                      </Text>
                    )}
                  </Column>
                )}
                {(isPrepaid() || isHybrid()) && (
                  <Column xs={6} md={isHybrid() ? 4 : 6}>
                    <Text weight={100} size={12} variant="lighter">
                      Airtime Balance
                    </Text>
                    <Text size={18} color={Colors.darkGreen} weight="bold">
                      {airtimeData?.airtimeModel.balance}
                    </Text>
                  </Column>
                )}
                <Column xs={6} md={isHybrid() ? 4 : 6}>
                  <Text weight={100} size={12} variant="lighter">
                    Data Balance
                  </Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
                    {airtimeData?.dataModel.balance}
                  </Text>
                </Column>
              </Row>
            </Column>
            {activePlanLoading || lazyActivePlanLoading ? (
              <Spinner />
            ) : (
              renderActivePlan()
            )}
            <Row useAppMargin>
              <Column useAppMargin xs={6}>
                <Button onClick={() => history.push('/airtime')} fullWidth>
                  Airtime
                </Button>
              </Column>
              <Column useAppMargin xs={6}>
                <Button
                  onClick={() => history.push('/data')}
                  fullWidth
                  outline
                  variant="secondary"
                >
                  Data
                </Button>
              </Column>
            </Row>
          </Column>
        )}
      </Card>
    </Column>
  );
};

SimBalances.defaultProps = {};
