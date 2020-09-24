import React, { useState } from 'react';
import { Styles } from './styles';

/**
 * This is a custom hook that is used to make api get requests
 * @param defaultChecked *
 * @returns an object containg a RadioInput component, checked and setChecked
 */
function useRadioInput(defaultChecked?: boolean) {
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
