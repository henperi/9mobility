import React from 'react';
import { Styles } from './styles';
import { Text } from '../Text';
import { SizedBox } from '../SizedBox';
import { Colors } from '../../themes/colors';
// import { Colors } from '../../themes/colors';

interface ITextField extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  backgroundColor?: string;
  verticalMargin?: boolean;
  as?: 'textarea' | 'input';
}

export const TextField: React.FC<ITextField> = (props) => {
  const {
    leftIcon,
    rightIcon,
    verticalMargin,
    backgroundColor,
    error,
    ...inputProps
  } = props;
  return (
    <>
      <Styles.TextField
        hasError={Boolean(error)}
        backgroundColor={backgroundColor}
        verticalMargin={verticalMargin}
      >
        {leftIcon && <div className="inputIcon">{leftIcon}</div>}
        <Styles.Input {...inputProps} />
        {rightIcon && <div className="inputIcon">{rightIcon}</div>}
      </Styles.TextField>
      <SizedBox height={5} />
      {error && <Text color={Colors.error} size={12}>{error}</Text>}
    </>
  );
};
