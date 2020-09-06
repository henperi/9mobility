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
}

export const Row: React.FC<IFlex> = (props) => {
  const { children, ...rest } = props;
  return <Styles.Row {...rest}>{children}</Styles.Row>;
};
