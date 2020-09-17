import React from 'react';
import { Styles, IColumn } from './styles';

export const Column: React.FC<IColumn> = (props) => {
  const { children, ...rest } = props;
  return <Styles.Column {...rest}>{children}</Styles.Column>;
};

Column.defaultProps = {
  xs: 12,
  useAppMargin: false,
};
