import React, { useRef, useState, useEffect } from 'react';
import range from 'lodash/range';

import { Styles } from './styles';
import { Row } from '../Row';
import { generateShortId } from '../../utils/generateShortId';

interface IUnitTextFIeld extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  backgroundColor?: string;
  isUnit?: boolean;
  numberOfUnits?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UnitTextField: React.FC<IUnitTextFIeld> = (props) => {
  const {
    backgroundColor,
    error,
    children,
    style,
    isUnit,
    numberOfUnits = 1,
    handleChange = () => null,
    ...unitProps
  } = props;

  const [state] = useState(() => {
    const result: { [x: string]: string } = {};

    range(numberOfUnits).map((index) => {
      result[index.toString()] = '';
      return result;
    });

    return result;
  });

  const ref = useRef(state);

  const refs: React.RefObject<HTMLInputElement>[] = range(numberOfUnits).map(
    () => {
      return React.createRef();
    },
  );

  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    if (refs[currentIndex]) {
      (refs[currentIndex].current as HTMLInputElement).focus();
    }
  }, [currentIndex, refs]);

  const isEditable = (index: number) => {
    return currentIndex >= index;
  };

  return (
    <Row>
      {range(numberOfUnits).map((index) => (
        <Styles.UnitTextField
          hasError={Boolean(error)}
          backgroundColor={backgroundColor}
          disabled={!!unitProps.disabled}
          key={generateShortId()}
        >
          <Styles.Input
            {...unitProps}
            maxLength={1}
            value={ref.current[index]}
            ref={refs[index]}
            disabled={!isEditable(index)}
            onChange={(e) => {
              e.persist();
              ref.current[index] = e.target.value;

              // if (!e.target.value && index > 0) {
              //   return setcurrentIndex(index - 1);
              // }

              const value = Object.values(ref.current).join('');
              const event = {
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>;

              if (refs[index + 1]) {
                setcurrentIndex(index + 1);
              }

              return handleChange(event);
            }}
          />
        </Styles.UnitTextField>
      ))}
    </Row>
  );
};
