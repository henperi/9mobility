import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './styles';

export interface IFlex extends HtmlHTMLAttributes<HTMLDivElement> {
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-envenly'
    | 'space-around';
  justifyContent?: IFlex['alignItems'];
  wrap?: boolean | string;
  childGap?: number;
  useAppMargin?: boolean;
}

export const Row: React.FC<IFlex> = (props) => {
  const { children, wrap, ...rest } = props;
  return (
    <Styles.Row wrap={wrap ? String(wrap) : ''} {...rest}>
      {children}
    </Styles.Row>
  );
};

Row.defaultProps = {
  wrap: true,
  childGap: 0,
  useAppMargin: false,
};
