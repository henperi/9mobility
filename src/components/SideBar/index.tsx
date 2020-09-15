import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';
import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import { rem } from '../../utils/rem';
import { Card } from '../Card';
import { Column } from '../Column';
import { Text } from '../Text';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { SizedBox } from '../SizedBox';
import { Row } from '../Row';
import { Avatar } from '../Avatar';

export const SideBar: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  return (
    <Styles.SideBar {...props}>
      <Logo style={{ marginLeft: rem(20) }} />
      <SizedBox height={30} />
      <Column>
        <Card color={convertHexToRGBA(Colors.yellowGreen, 0.3)}>
          <Row wrap={false}>
            <Avatar
              style={{ marginRight: '10px' }}
              image="https://cdn.cnn.com/cnnnext/dam/assets/140217175126-15-mixed-biracial-black-horizontal-large-gallery.jpg"
            />
            <Column>
              <Text size={14}>Gbenga Osinowo</Text>
              <Text color={Colors.blackGrey} size={12}>
                Gbengaosinowo@gmail
              </Text>
            </Column>
          </Row>
        </Card>
        <SizedBox height={10} />
        <Styles.SideBarLink active>Dashboard</Styles.SideBarLink>
        <SizedBox height={20} />

        <Styles.SideBarLink>
          <Text size={12} color={Colors.blackGrey} weight={600}>
            Network & Subscriber services
          </Text>
        </Styles.SideBarLink>
        <SizedBox height={5} />

        <Styles.SideBarLink>Airtime</Styles.SideBarLink>
        <Styles.SideBarLink>Data</Styles.SideBarLink>
        <Styles.SideBarLink>Call History</Styles.SideBarLink>
        <Styles.SideBarLink>Data Usage</Styles.SideBarLink>
        <Styles.SideBarLink>Transaction History</Styles.SideBarLink>
        <Styles.SideBarLink>Prepaid Plans</Styles.SideBarLink>
        <Styles.SideBarLink>Postpaid/Corporate</Styles.SideBarLink>
        <Styles.SideBarLink>Roaming</Styles.SideBarLink>
        <Styles.SideBarLink>My Subscribed Services</Styles.SideBarLink>
      </Column>
    </Styles.SideBar>
  );
};
