import React, { useEffect, useState } from 'react';
import { OnboardingAuthResponse } from '.';
import { Button } from '../../components/Button';
import { DropDownButton } from '../../components/Button/DropdownButton';
import { Card } from '../../components/Card';
import { Column } from '../../components/Column';
import { Row } from '../../components/Row';
import { SizedBox } from '../../components/SizedBox';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { useFetch, usePost } from '../../customHooks/useRequests';
import { Colors } from '../../themes/colors';
import { logger } from '../../utils/logger';

// import { setAuthUser } from '../../store/modules/auth/actions';
import { useGlobalStore } from '../../store';
import { ErrorBox } from '../../components/ErrorBox';

interface WalletsResp {
  result: {
    narration: string;
    accountNumber: string;
    availableBalance: number;
  };
}

export const Wallet: React.FC = () => {
  const { data, loading } = useFetch<WalletsResp>(
    'Mobility.Account/api/Wallets/Balance',
  );

  const {
    dispatch,
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  useEffect(() => {
    if (data) {
      // setmobile(data.result.availableBalance);
      // logger.log(user);
    }
  }, [data, user]);

  const [mobile, setmobile] = useState('');

  const [createWalletRequest] = usePost<OnboardingAuthResponse>(
    'Mobility.Onboarding/api/Onboarding/createwallet',
  );

  const [loadingCreateWallet, setLoadingCreateWallet] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const handleCreateWallet = async () => {
    try {
      setLoadingCreateWallet(true);
      setErrorMessage('');

      const result = await createWalletRequest();
      setLoadingCreateWallet(false);
      dispatch(null);
      logger.log(result);
    } catch (error) {
      setLoadingCreateWallet(false);
      setErrorMessage((error as Error).message);
    }
  };

  const getContent = () => {
    if (user?.hasWallet && data?.result) {
      return (
        <Column fullHeight alignItems="space-between">
          <DropDownButton
            dropdownOptions={[{ value: mobile, label: mobile }]}
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

          <Column xs={6}>
            <Text>Wallet Balance</Text>
            <Text size={18} color={Colors.darkGreen} weight="bold">
              N{data.result.availableBalance}
            </Text>
          </Column>
          <SizedBox height={35} />
          <Text>
            You’re currently on MoreTalk. Call rate is 25k/sec to all networks
            after ₦25 spend.
          </Text>
          <SizedBox height={25} />
          <Row useAppMargin>
            <Column useAppMargin xs={6}>
              <Button fullWidth>Fund Wallet</Button>
            </Column>
            <Column useAppMargin xs={6}>
              <Button fullWidth outline variant="secondary">
                Auto Fund
              </Button>
            </Column>
          </Row>
        </Column>
      );
    }

    return (
      <Column fullHeight alignItems="space-between">
        <Text size={18} color={Colors.darkGreen} weight={500}>
          Wallet
        </Text>

        {/* <SizedBox height={35} /> */}
        <Text>
          You preserntly don’t have a 9PSB wallet. Create a wallet to enjoy
          unlimited possibilities
        </Text>
        {/* <SizedBox height={25} /> */}
        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
        <Button
          isLoading={loadingCreateWallet}
          fullWidth
          onClick={handleCreateWallet}
        >
          Create 9PSB account
        </Button>
      </Column>
    );
  };

  return (
    <Column xs={12} md={12} lg={4} xl={4} useAppMargin fullHeight>
      <Card
        fullWidth
        fullHeight
        style={{ minHeight: '200px', padding: '28px' }}
      >
        {loading ? <Spinner isFixed /> : getContent()}
      </Card>
    </Column>
  );
};
