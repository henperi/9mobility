import React from 'react';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/CheckBox';

export const RegisterationComplete = () => {
  return (
    <PageBody centeralize>
      <Card
        cardHeader={{ title: 'Welcome', subtitle: 'Registeration complete' }}
      >
        <Column>
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
            <Text variant="lighter">
              <Checkbox> Automatically create a 9PSB wallet for me </Checkbox>
            </Text>
          </SizedBox>
          <SizedBox height={40} />
          <Button fullWidth>Proceed to dashboard</Button>
          <SizedBox height={24} />
        </Column>
      </Card>
    </PageBody>
  );
};
