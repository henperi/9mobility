import React, { useState } from 'react';
import { Styles } from './styles';

/**
 * Custom hook for radio buttons.
 * @param {boolean} defaultChecked If checkbox should be checked by default.
 * @returns {any} a component, the state and function to update state.
 */
function useRadioInput(defaultChecked?: boolean): any {
  const [checked, setChecked] = useState(defaultChecked);

  const RadioInput: React.FC<{
    onClick?:
      | ((event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void)
      | undefined;
    onKeyDown?:
      | ((event: React.KeyboardEvent<HTMLLabelElement>) => void)
      | undefined;
  }> = (props) => {
    const { children = false, onClick, onKeyDown } = props;

    return (
      <label
        onClick={onClick}
        onKeyDown={onKeyDown}
        role="presentation"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        htmlFor="RadioInput"
      >
        <Styles.RadioInput active={checked}>
          {checked && <div className="checked" />}
        </Styles.RadioInput>
        {children}
      </label>
    );
  };

  return { RadioInput, checked, setChecked };
}

export default useRadioInput;
