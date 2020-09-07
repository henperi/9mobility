import React from 'react';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';

export const ConfirmNumber: React.FC = () => {
  return (
    <PageBody centeralize>
      <Card>
        <Column>
          <Text variant="darker" size={32}>
            Welcome
          </Text>
          <SizedBox height={4} />
          <Text variant="lighter">
            You’ll get an sms to confirm your number
          </Text>
          <SizedBox height={78} />
          <TextField
            label="Phone Number"
            leftIcon="+234"
            placeholder="Enter phone number"
          />
          <SizedBox height={60} />
          <Button fullWidth>Continue</Button>
          <SizedBox height={100} />
        </Column>
      </Card>
    </PageBody>
  );
};
