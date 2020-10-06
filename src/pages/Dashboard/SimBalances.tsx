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

interface AirtimeDataResp {
  result: {
    mobileNumber: string;
    airtimeModel: {
      balance: string;
      bonusBalance: string;
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

  const [mobile, setmobile] = useState('');

  const [getAirtime, { data, loading }] = useLazyFetch<AirtimeDataResp>(
    `Mobility.Account/api/Balance/AirtimeAndData/${mobile}`,
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

  useEffect(() => {
    if (mobile) {
      handelGetAirtime();
    }
  }, [handelGetAirtime, mobile]);

  const history = useHistory();

  const {
    data: activePlan,
    loading: activePlanLoading,
    error: activePlanError,
  } = useGetActivePlan();

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
                  dropDownChange={(e) => setmobile(e.value)}
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
                    {mobile || (mobileNumbers && mobileNumbers[0].value)}
                  </Text>
                </DropDownButton>
                <RefreshIcon onClick={() => handelGetAirtime()} />
              </Row>
              <SizedBox height={20} />
              <Row>
                <Column xs={6}>
                  <Text size={14}>Airtime Balance</Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
                    {airtimeData?.airtimeModel.balance}
                  </Text>
                </Column>
                <Column xs={6}>
                  <Text size={14}>Data Balance</Text>
                  <Text size={18} color={Colors.darkGreen} weight="bold">
                    {airtimeData?.dataModel.balance}
                  </Text>
                </Column>
              </Row>
            </Column>
            {/* <SizedBox height={35} /> */}
            {activePlanLoading ? <Spinner /> : renderActivePlan()}
            {/* <SizedBox height={25} /> */}
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
