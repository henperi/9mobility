import React, { useEffect, useState } from 'react';
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
import { useFetch } from '../../customHooks/useRequests';
import { Colors } from '../../themes/colors';

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
  const { data, loading } = useFetch<AirtimeDataResp>(
    'Mobility.Account/api/Balance/AirtimeAndData',
  );

  const { mobileNumbers } = useGetMobileNumbers();

  const [mobile, setmobile] = useState('');

  const [airtimeData, setAirtimeData] = useState<
    null | AirtimeDataResp['result']
  >();

  useEffect(() => {
    if (data) {
      setAirtimeData(data.result);
      setmobile(data.result.mobileNumber);
    }
  }, [data]);

  const history = useHistory();

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
            <DropDownButton
              dropdownOptions={mobileNumbers}
              useDefaultName={false}
              variant="default"
              dropDownChange={(e) => setmobile(e.value)}
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
                  {airtimeData?.airtimeModel.balance}
                </Text>
              </Column>
              <Column xs={6}>
                <Text>Data Balance</Text>
                <Text size={18} color={Colors.darkGreen} weight="bold">
                  {airtimeData?.dataModel.balance}
                </Text>
              </Column>
            </Row>
            <SizedBox height={35} />
            <Text>
              You’re currently on MoreTalk. Call rate is 25k/sec to all networks
              after ₦25 spend.
            </Text>
            <SizedBox height={25} />
            <Row useAppMargin>
              <Column useAppMargin xs={6}>
                <Button onClick={() => history.push('/airtime')} fullWidth>
                  Airtime
                </Button>
              </Column>
              <Column useAppMargin xs={6}>
                <Button
                  onClick={() => history.push('/airtime')}
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
