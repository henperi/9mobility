import React from 'react';
import { Styles } from './styles';
import { Spinner } from '../Spinner';

export const Button: React.FC<{
  variant?: 'default' | 'primary' | 'secondary' | 'Tertiary' | 'Neutral';
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
}> = (props) => {
  const { children, variant = 'primary', ...rest } = props;
  return (
    <Styles.Button variant={variant} {...rest}>
      {props.loading ? <Spinner size={20}></Spinner> : children}
    </Styles.Button>
  );
};
