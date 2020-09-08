import React from 'react';
import { Styles } from './styles';
import { Column } from '../Column';
import { SizedBox } from '../SizedBox';
import { Text } from '../Text';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';

export const Card: React.FC<{
  padding?: boolean;
  margin?: number;
  showOverlayedDesign?: boolean;
  cardHeader?: {
    title?: string;
    subtitle?: string;
  };
}> = (props) => {
  const { children, cardHeader, showOverlayedDesign = true } = props;
  return (
    <Styles.Card>
      <Column>
        {cardHeader && (
          <SizedBox height={182}>
            <Styles.CardHeader>
              <img src={appLogoBig} alt="appLogoBig" />
              <Column>
                {cardHeader.title && (
                  <Text size={32} style={{ fontWeight: 'bold' }}>
                    {cardHeader.title}
                  </Text>
                )}
                {cardHeader.subtitle && <Text>{cardHeader.subtitle}</Text>}
              </Column>
            </Styles.CardHeader>
          </SizedBox>
        )}
        {children}
        {showOverlayedDesign && <Styles.OverlayedDesign />}
      </Column>
    </Styles.Card>
  );
};
