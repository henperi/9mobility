import React from 'react';
import { NavBar } from '../../components/NavBar';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';

export const WelcomePage = () => {
  return (
    <>
      <NavBar></NavBar>
      <PageBody centeralize>
        <Card>
          <Column>
            <Text variant="darker" size={32}>
              Welcome
            </Text>
            <SizedBox height={25} />
            <Text variant="lighter">
              You’ll get an sms to confirm your number
            </Text>
            <SizedBox height={92} />
            <TextField leftIcon="+234" placeholder="Enter phone number"></TextField>
            <SizedBox height={60} />
            <Button fullWidth>Continue</Button>
          </Column>
        </Card>
      </PageBody>
    </>
  );
};
