import React, { useEffect, useState, useRef } from 'react';

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
import { Portal } from '../Portal';

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
    value: string | number;
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
  const [value, setValue] = useState<{ label: string; value: string | number }>(
    {
      label: '',
      value: '',
    },
  );

  const [coords, setCoords] = useState<{
    left?: number;
    top?: number;
    width?: string;
  }>({});

  const ref = useRef<HTMLElement | null | undefined>();

  const toggleDropDown = () => {
    const rect = ref.current?.getBoundingClientRect();

    if (rect) {
      setCoords({
        left: rect.x,
        top: rect.y + rect.height + window.scrollY,
        width: `${rect.width}px`,
      });
    }
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
          value: dropDownOptions?.length
            ? value.label || value.value
            : 'loading...',
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
          ref={ref as React.RefObject<HTMLDivElement>}
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
          <Portal width={coords.width}>
            <DropDownStack
              style={{
                width: '100%',
                left: coords?.left,
                top: coords?.top,
              }}
            >
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
          </Portal>
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
              casing="sentenceCase"
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
