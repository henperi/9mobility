import React from 'react';
import { useHistory } from 'react-router-dom';
import { Styles as CardStyles } from '../../components/Card/styles';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { ReactComponent as PostpaidBill } from '../../assets/images/postpaidBill.svg';
import { ReactComponent as PostpaidBillStmt } from '../../assets/images/postpaidBillStatement.svg';
import { ReactComponent as PostpaidBundle } from '../../assets/images/postpaidBundle.svg';
import { ReactComponent as PostpaidAccount } from '../../assets/images/postpaidAccount.svg';
import { Colors } from '../../themes/colors';
import { PageBody } from '../../components/PageBody';
import { Column } from '../../components/Column';
import { SizedBox } from '../../components/SizedBox';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Card } from '../../components/Card';

export const PostpaidPage: React.FC = () => {
  const history = useHistory();

  return (
    <PageBody>
      <CardStyles.CardHeader
        style={{ height: '100%', position: 'relative', padding: '28px' }}
      >
        <img src={appLogoBig} alt="appLogoBig" />

        <Column>
          <SizedBox height={10} />
          <Text size={32} weight={500}>
            Postpaid/Corporate
          </Text>
          <SizedBox height={5} />
          <Text weight={500} color={Colors.grey}>
            Make postpaid bill payment, manage account features and services{' '}
          </Text>
          <SizedBox height={30} />
        </Column>
      </CardStyles.CardHeader>
      <SizedBox height={40} />
      <Row useAppMargin>
        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/postpaid/pay-bill')}
          >
            <SizedBox height={20} />

            <PostpaidBill />
            <SizedBox height={70} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Pay Postpaid bill
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              See outstanding bill & make payment
            </Text>
          </Card>
        </Column>

        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/postpaid/download-statement')}
          >
            <SizedBox height={20} />
            <PostpaidBillStmt />
            <SizedBox height={70} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Download Bill statement
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              Buy airtime using debit card or bank account
            </Text>
          </Card>
        </Column>

        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/postpaid/buy-bundle')}
          >
            <SizedBox height={20} />

            <PostpaidBundle />

            <SizedBox height={70} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Buy Postpaid Data Bundle
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              Buy Postpaid data bundles
            </Text>
          </Card>
        </Column>

        <Column useAppMargin md={6} lg={3} fullHeight>
          <Card
            fullWidth
            fullHeight
            onClick={() => history.push('/postpaid/manage-acct')}
          >
            <SizedBox height={20} />

            <PostpaidAccount />

            <SizedBox height={70} />
            <Text size={18} weight={500} color={Colors.lightGreen}>
              Manage Postpaid Account
            </Text>
            <SizedBox height={8} />
            <Text casing="sentenceCase" variant="lighter">
              See all MSISDNs on your contract
            </Text>
          </Card>
        </Column>
      </Row>
    </PageBody>
  );
};
