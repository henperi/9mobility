import React from 'react';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';

export const ConfirmOTP = () => {
  return (
    <PageBody centeralize>
      <Card>
        <Column>
          <Text variant="darker" size={32}>
            OTP
          </Text>
          <SizedBox height={4} />
          <Text variant="lighter">
            Enter code sent via sms to +234 909849803
          </Text>
          <SizedBox height={78} />
          <TextField
            label="OTP"
            isUnit
            numberOfUnits={4}
            style={{ display: 'flex', alignSelf: 'center', width: 'max-content' }}
          ></TextField>
          <SizedBox height={60} />
          <Button fullWidth>Continue</Button>
          <SizedBox height={32} />
          <Text alignment="center" size={15} variant="lighter">
            Resend OTP in 0:54
          </Text>
          <SizedBox height={52} />
        </Column>
      </Card>
    </PageBody>
  );
};
