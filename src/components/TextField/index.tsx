import React, { useEffect, useState } from 'react';

import { Styles } from './styles';
import { Text } from '../Text';
import { SizedBox } from '../SizedBox';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { Column } from '../Column';
import { UnitTextField } from './UnitTextField';

import { ReactComponent as ArrowComponent } from '../../assets/images/arrowDown.svg';
import {
  DropDownContainer,
  DropDownItem,
  DropDownStack,
} from '../Button/styles';
import { generateShortId } from '../../utils/generateShortId';

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
  dropDown?: boolean;
  dropDownOptions?: {
    label: string;
    value: string;
  }[];
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
    dropDown,
    dropDownOptions,
    ...inputProps
  } = props;

  const [showDropDown, setshowDropDown] = useState(false);
  const [value, setValue] = useState({
    label: '',
    value: '',
  });

  const toggleDropDown = () => {
    setshowDropDown(!showDropDown);
  };

  useEffect(() => {
    const closeDropDown = () => {
      if (showDropDown) {
        setshowDropDown(false);
      }
    };

    window.addEventListener('click', closeDropDown);

    return () => window.removeEventListener('click', closeDropDown);
  }, [showDropDown]);

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

    const getDropDownProps = () => {
      if (dropDown) {
        return {
          readOnly: true,
          value: value.label || value.value,
          onClick: toggleDropDown,
        };
      }
      return null;
    };

    return (
      <>
        <Styles.TextField
          hasError={Boolean(error)}
          backgroundColor={backgroundColor}
          disabled={!!inputProps.disabled}
          style={style}
          dropDown={dropDown}
        >
          {leftIcon && <div className="inputIcon">{leftIcon}</div>}
          <Styles.Input {...inputProps} {...getDropDownProps()} />
          {rightIcon ||
            (dropDown && (
              <div className="inputIcon">
                {rightIcon || <ArrowComponent onClick={toggleDropDown} />}
              </div>
            ))}
        </Styles.TextField>

        {dropDownOptions && showDropDown && (
          <DropDownStack style={{ width: '100%' }}>
            <DropDownContainer>
              {dropDownOptions?.map((option) => {
                return (
                  <DropDownItem
                    key={generateShortId()}
                    onClick={() => {
                      setValue(option);

                      if (inputProps.onChange) {
                        const e = {
                          target: {
                            value: option.value,
                            label: option.label,
                          },
                        };

                        inputProps.onChange(e as any);
                      }
                    }}
                    role="presentation"
                  >
                    {option.label}
                  </DropDownItem>
                );
              })}
            </DropDownContainer>
          </DropDownStack>
        )}
      </>
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
