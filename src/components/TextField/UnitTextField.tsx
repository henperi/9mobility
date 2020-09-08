import React, { useRef, useState } from 'react';
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
            onChange={(e) => {
              e.persist();
              ref.current[index] = e.target.value;

              const value = Object.values(ref.current).join('');
              const event = {
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>;

              handleChange(event);
            }}
          />
        </Styles.UnitTextField>
      ))}
    </Row>
  );
};
