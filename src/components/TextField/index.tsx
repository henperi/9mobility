import React from 'react';
import { Styles } from './styles';
import { Text } from '../Text';
import { SizedBox } from '../SizedBox';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { Column } from '../Column';
import { Row } from '../Row';
import range from 'lodash/range';

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
  isUnit?: boolean;
  numberOfUnits?: number;
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
    isUnit,
    numberOfUnits = 1,
    ...inputProps
  } = props;

  const renderChildren = () => {
    if (isUnit) {
      const { onChange, ...unitProps } = inputProps;

      return (
        <Row>
          {range(numberOfUnits).map(() => (
            <Styles.UnitTextField
              hasError={Boolean(error)}
              backgroundColor={backgroundColor}
              disabled={!!inputProps.disabled}
            >
              <Styles.Input {...unitProps} maxLength={1} />
            </Styles.UnitTextField>
          ))}
        </Row>
      );
    }

    return (
      <Styles.TextField
        hasError={Boolean(error)}
        backgroundColor={backgroundColor}
        disabled={!!inputProps.disabled}
      >
        {leftIcon && <div className="inputIcon">{leftIcon}</div>}
        <Styles.Input {...inputProps} />
        {rightIcon && <div className="inputIcon">{rightIcon}</div>}
      </Styles.TextField>
    );
  };

  return (
    <Styles.TextFieldContainer style={style} verticalMargin={verticalMargin}>
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
