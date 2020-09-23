import React, { useState } from 'react';
import { Styles } from './styles';

function useRadioInput(
  defaultChecked?: boolean,
) {
  const [checked, setChecked] = useState(defaultChecked);

  const RadioInput: React.FC<{
    onClick?: ((event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void) | undefined,
    onKeyDown?: ((event: React.KeyboardEvent<HTMLLabelElement>) => void) | undefined
  }> = (props) => {
    const { children = false, onClick, onKeyDown, ...rest } = props;

    return (
      <label
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="presentation"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            htmlFor="RadioInput"
          >
            <Styles.RadioInput  active={checked}>
              {checked && <div className="checked" />}
            </Styles.RadioInput>
            {children}
          </label>
    );
  };

  return { RadioInput, checked, setChecked };
}

export default useRadioInput;