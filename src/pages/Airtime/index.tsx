import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';

import { ReactComponent as CreditCard } from '../../assets/images/creditCard.svg';
import { ReactComponent as NotePin } from '../../assets/images/notePin.svg';
import { ReactComponent as TransferForward } from '../../assets/images/transferForward.svg';
import { ReactComponent as MobileBorrow } from '../../assets/images/mobileBorrow.svg';
import { useLazyFetch } from '../../customHooks/useRequests';
import { Spinner } from '../../components/Spinner';
import { useSimStore } from '../../store/simStore';
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

export const AirtimePage: React.FC = () => {
  const history = useHistory();

  const {
    state: { sim },
  } = useSimStore();

  const [getAirtime, { data, loading }] = useLazyFetch<AirtimeDataResp>(
    `Mobility.Account/api/Balance/AirtimeAndData/${sim.secondarySim}`,
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
    if (sim.secondarySim) {
      handelGetAirtime();
    }
  }, [handelGetAirtime, sim.secondarySim]);

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <Text size={32} weight={500}>
            Airtime
          </Text>
          <SizedBox height={32} />
          <Row wrap useAppMargin>
            {loading ? (
              <SizedBox height={50}>
                <Spinner isFixed>Gathering your balances</Spinner>
              </SizedBox>
            ) : (
              <>
                <Column useAppMargin xs={6} md={3} lg={2}>
                  <Text size={12} weight={500} color={Colors.grey}>
                    Airtime Balance
                  </Text>
                  <Text size={24} weight={500}>
                    {airtimeData && airtimeData.airtimeModel.balance}
                  </Text>
                </Column>
                <Column useAppMargin xs={6} md={3} lg={2}>
                  <Text size={12} weight={500} color={Colors.grey}>
                    Airtime Bonus
                  </Text>
                  <Text size={24} weight={500}>
                    {airtimeData && airtimeData.airtimeModel.bonusBalance}
                  </Text>
                </Column>
              </>
            )}
          </Row>
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Row useAppMargin>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/airtime/buy-with-debit-card')}
          >
            <CreditCard title="Buy with debit card" />
            <SizedBox height={60} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Buy with debit card
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Buy airtime using debit card or bank account
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/airtime/buy-with-pin')}
          >
            <NotePin title="Recharge with PIN" />
            <SizedBox height={50} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Recharge with PIN
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Use the PIN code of airtime recharge voucher
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/airtime/transfer')}
          >
            <TransferForward title="Transfer airtime" />
            <SizedBox height={50} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Transfer airtime
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Send airtime to another number from your balance
            </Text>
          </Card>
        </Column>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/airtime/borrow')}
          >
            <MobileBorrow title="Borrow airtime" />
            <SizedBox height={45} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Borrow airtime
            </Text>
            <SizedBox height={8} />
            <Text variant="lighter">
              Borrow airtime and payback on your next recharge
            </Text>
          </Card>
        </Column>
      </Row>
    </PageBody>
  );
};
