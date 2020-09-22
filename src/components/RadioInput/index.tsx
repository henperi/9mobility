import React, { useState } from 'react';
import { Styles } from './styles';

interface RadioInputEvent {
  target: { value: boolean };
}

export const RadioInput: React.FC<{
  checked?: boolean;
  onChange?: (event: RadioInputEvent) => void;
}> = (props) => {
  const { children, checked = false, onChange = () => null, ...rest } = props;
  const [state, setState] = useState(checked);

  const handleClick = () => {
    setState(!state);

    const event = {
      target: { value: !state },
    } as RadioInputEvent;

    onChange(event);
  };

  return (
    <label
      onClick={handleClick}
      onKeyDown={handleClick}
      role="presentation"
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      htmlFor="RadioInput"
    >
      <Styles.RadioInput {...rest} active={state}>
        {state && <div className="checked" />}
      </Styles.RadioInput>
      {children}
    </label>
  );
};
