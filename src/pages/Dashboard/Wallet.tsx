import React, { useEffect } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { useFetch } from '../../customHooks/useRequests';
import { Colors } from '../../themes/colors';
import { logger } from '../../utils/logger';

interface WalletsResp {
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

export const Wallet: React.FC = () => {
  const { data, loading } = useFetch<WalletsResp>(
    'Mobility.Account/api/Wallets/Balance',
  );

  useEffect(() => {
    if (data) {
      logger.log(data);
    }
  }, [data]);

  return (
    <Column xs={12} md={6} lg={4} xl={4} useAppMargin fullHeight>
      <Card fullWidth fullHeight style={{ minHeight: '300px' }}>
        {loading ? (
          <Spinner isFixed />
        ) : (
          <Column fullHeight alignItems="space-between">
            <Text size={18} color={Colors.darkGreen} weight={500}>
              Wallet
            </Text>

            <SizedBox height={35} />
            <Text>
              You preserntly don’t have a 9PSB wallet. Create a wallet to enjoy
              unlimited possibilities
            </Text>
            <SizedBox height={25} />
            <Button fullWidth>Create 9PSB account</Button>
          </Column>
        )}
      </Card>
    </Column>
  );
};
