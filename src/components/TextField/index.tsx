import React from 'react';

import { Styles } from './styles';
import { Text } from '../Text';
import { SizedBox } from '../SizedBox';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { Column } from '../Column';
import { UnitTextField } from './UnitTextField';

export interface ITextField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
  backgroundColor?: string;
  multiline?: boolean;
  verticalMargin?: boolean;
  as?: 'textarea' | 'input';
  multiUnits?: boolean;
  numberOfUnits?: number;
  containerStyle?: React.CSSProperties;
}

export const TextField: React.FC<ITextField> = (props) => {
  const {
    leftIcon,
    rightIcon,
    verticalMargin,
    backgroundColor,
    error,
    label,
    helperText,
    multiline,
    children,
    style,
    multiUnits,
    numberOfUnits,
    containerStyle,
    ...inputProps
  } = props;

  const renderChildren = () => {
    if (multiUnits) {
      return (
        <UnitTextField
          error={error}
          backgroundColor={backgroundColor}
          disabled={!!inputProps.disabled}
          numberOfUnits={numberOfUnits}
          handleChange={inputProps.onChange}
        />
      );
    }

    return (
      <Styles.TextField
        hasError={Boolean(error)}
        backgroundColor={backgroundColor}
        disabled={!!inputProps.disabled}
        style={style}
      >
        {leftIcon && <div className="inputIcon">{leftIcon}</div>}
        <Styles.Input {...inputProps} />
        {rightIcon && <div className="inputIcon">{rightIcon}</div>}
      </Styles.TextField>
    );
  };

  return (
    <Styles.TextFieldContainer
      style={containerStyle}
      verticalMargin={verticalMargin}
    >
      <Column>
        {label && (
          <label htmlFor="label">
            <Text color={Colors.blackGrey} size={12}>
              {label}
            </Text>
          </label>
        )}
        <SizedBox height={5} />
        {renderChildren()}
        {error && (
          <>
            <SizedBox height={2.5} />
            <Text
              casing="titleCase"
              color={convertHexToRGBA(Colors.error, 0.8)}
              size={12}
            >
              {error}
            </Text>
          </>
        )}
        {helperText && (
          <>
            <SizedBox height={2.5} />
            <Text
              casing="titleCase"
              color={convertHexToRGBA(Colors.blackGrey)}
              size={12}
            >
              {helperText}
            </Text>
          </>
        )}
      </Column>
    </Styles.TextFieldContainer>
  );
};
