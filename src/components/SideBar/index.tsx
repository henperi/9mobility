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
import { useGlobalStore } from '../../store';

interface ISidebar extends HtmlHTMLAttributes<HTMLDivElement> {
  showSidebar?: boolean;
}
export const SideBar: React.FC<ISidebar> = (props) => {
  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

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
              <Text size={14}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text color={Colors.blackGrey} size={12}>
                {user?.email}
              </Text>
            </Column>
          </Row>
        </Card>
        <SizedBox height={10} />
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/dashboard"
        >
          Dashboard
        </Styles.SideBarLink>
        <SizedBox height={20} />

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="any"
          onClick={(e) => e.preventDefault()}
        >
          <Text size={12} color={Colors.blackGrey} weight={600}>
            Network & Subscriber services
          </Text>
        </Styles.SideBarLink>
        <SizedBox height={5} />

        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/airtime">
          Airtime
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/any">
          Data
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/any">
          Call History
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/data-usage/history"
        >
          Data Usage
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/transaction/history"
        >
          Transaction History
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/any">
          Prepaid Plans
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/any">
          Postpaid/Corporate
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/any">
          Roaming
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/any">
          My Subscribed Services
        </Styles.SideBarLink>
      </Column>
    </Styles.SideBar>
  );
};
