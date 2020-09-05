import React from 'react';
import { Card } from '../../components/Card';
import { PageBody } from '../../components/PageBody';
import { Text } from '../../components/Text';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';

export const Register = () => {
  return (
    <PageBody centeralize>
      <Card>
        <Column>
          <Text variant="darker" size={32}>
            Almost done
          </Text>
          <SizedBox height={4} />
          <Text variant="lighter">
            We’d like to know a little more about you
          </Text>
          <SizedBox height={36} />
          <TextField
            label="Email"
            placeholder="Enter email"
          ></TextField>
          <SizedBox height={16} />
          <TextField
            label="First Name"
            placeholder="Enter first name"
          ></TextField>
          <SizedBox height={16} />
          <TextField
            label="Last Name"
            placeholder="Enter last name"
          ></TextField>
          <SizedBox height={24} />
          <Button fullWidth>Finish</Button>
          <SizedBox height={100} />
        </Column>
      </Card>
    </PageBody>
  );
};
