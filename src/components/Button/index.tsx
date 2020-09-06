import React from 'react';
import { Styles } from './styles';
import { Spinner } from '../Spinner';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'Tertiary' | 'Neutral';
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
  elevated?: boolean;
  rounded?: boolean;
  borderColor?: string;
  border?: boolean;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { children, variant = 'primary', ...rest } = props;
  return (
    <Styles.Button variant={variant} {...rest}>
      {props.loading ? <Spinner size={20}></Spinner> : children}
    </Styles.Button>
  );
};
