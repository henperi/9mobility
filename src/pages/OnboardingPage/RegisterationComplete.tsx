import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/CheckBox';
import { SetScreen } from '.';
import { logger } from '../../utils/logger';
import { usePost } from '../../customHooks/useRequests';
import { OnboardingAuthResponse } from './ConfirmOTP';
import { ErrorBox } from '../../components/ErrorBox';
import { useGlobalStore } from '../../store';
import { setAuthUser } from '../../store/modules/auth/actions';

export const RegisterationComplete: React.FC<SetScreen> = () => {
  const [createWalletRequest] = usePost<OnboardingAuthResponse>(
    'Mobility.Onboarding/api/Onboarding/createwallet',
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const history = useHistory();

  const [createWallet, setcreateWallet] = useState(false);
  const { dispatch } = useGlobalStore();

  const handleCreateWallet = async () => {
    if (!createWallet) {
      history.push(`/dashboard`);
    } else {
      try {
        setLoading(true);
        setErrorMessage('');

        const result = await createWalletRequest();
        setLoading(false);
        dispatch(setAuthUser(result.data.result));

        history.push(`/dashboard`);

        logger.log(result.data);
      } catch (error) {
        setLoading(false);
        setErrorMessage((error as Error).message);
      }
    }
  };

  return (
    <PageBody centeralize>
      <Column xs={12} sm={10} md={8} lg={6} xl={5} fullHeight>
        <Card
          fullWidth
          padding="7% 15%"
          showOverlayedDesign
          cardHeader={{ title: 'Welcome', subtitle: 'Registeration complete' }}
        >
          <Column fullHeight>
            <SizedBox style={{ maxWidth: '360px' }}>
              <Text variant="lighter">Hi Paul,</Text>
              <SizedBox height={25} />

              <Text variant="lighter">
                Welcome on board. Enjoy a whole new personal digital experience.
              </Text>
              <SizedBox height={25} />

              <Text variant="lighter">Best Regards,</Text>
              <SizedBox height={25} />

              <Text variant="lighter">9mobile</Text>
              <SizedBox height={34} />

              {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

              <Text variant="lighter">
                <Checkbox onChange={(e) => setcreateWallet(e.target.value)}>
                  Automatically create a 9PSB wallet for me{' '}
                </Checkbox>
              </Text>
            </SizedBox>
            <SizedBox height={40} />
            <Button onClick={handleCreateWallet} isLoading={loading} fullWidth>
              Proceed to dashboard
            </Button>
            <SizedBox height={24} />
          </Column>
        </Card>
      </Column>
    </PageBody>
  );
};
