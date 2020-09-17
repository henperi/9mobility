import React, { HtmlHTMLAttributes } from 'react';
import { Styles, ICardProps } from './styles';
import { Column } from '../Column';
import { SizedBox } from '../SizedBox';
import { Text } from '../Text';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';

export const Card: React.FC<HtmlHTMLAttributes<HTMLDivElement> & ICardProps> = (
  props,
) => {
  const { children, cardHeader, showOverlayedDesign = false, ...rest } = props;
  return (
    <Styles.Card {...rest}>
      <Column fullHeight>
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
