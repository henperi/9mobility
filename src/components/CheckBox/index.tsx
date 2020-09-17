import React, { useState } from 'react';
import { Styles } from './styles';

interface CheckBoxEvent {
  target: { value: boolean };
}

export const Checkbox: React.FC<{
  checked?: boolean;
  onChange?: (event: CheckBoxEvent) => void;
}> = (props) => {
  const { children, checked = false, onChange = () => null, ...rest } = props;
  const [state, setState] = useState(checked);

  const handleClick = () => {
    setState(!state);

    const event = {
      target: { value: !state },
    } as CheckBoxEvent;

    onChange(event);
  };

  return (
    <label
      onClick={handleClick}
      onKeyDown={handleClick}
      role="presentation"
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      htmlFor="checkbox"
    >
      <Styles.Checkbox {...rest}>
        {state && <div className="checked" />}
      </Styles.Checkbox>
      {children}
    </label>
  );
};
