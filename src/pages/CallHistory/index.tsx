import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { CallHistoryNumberCheck } from './CallHistoryNumberCheck';
import { CallHistoryConfirmOTP } from './CallHistoryConfirmOTP';
import { CallHistoryTable } from './CallHistoryTable';


export const CallHistory: React.FC = () => {
  let { path, url } = useRouteMatch();

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
      <div>
        <Route exact path={path} component={CallHistoryNumberCheck} />
        <Route path={`${path}/confirm-opt`} component={CallHistoryConfirmOTP} />
        <Route path={`${path}/history`} component={CallHistoryTable} />
      </div>
    </PageBody>
  );
};
