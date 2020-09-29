import React from 'react';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { CallHistoryNumberCheck } from './CallHistoryNumberCheck';

export const CallHistory: React.FC = () => {
  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />
        <Column>
          <SizedBox height={10} />
          <Text size={32} weight={500}>
            Call History
          </Text>
          <SizedBox height={5} />
          <Text weight={500} color={Colors.grey}>
            Your airtime spending history
          </Text>
          <SizedBox height={30} />
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <CallHistoryNumberCheck />
    </PageBody>
  );
};
