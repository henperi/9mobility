import React, { FC, useState } from 'react';
import { Styles } from './styles';

interface RadioInputEvent {
  target: { value: boolean };
}

export const ToggleSwitch: FC<{
  checked?: boolean;
  onChange?: (event: RadioInputEvent) => void;
  id: string;
}> = (props) => {
  const { checked, children, onChange = () => null, id, ...rest } = props;
  const [state, setState] = useState(checked);

  const handleClick = () => {
    setState(!state);

    const event = {
      target: { value: !state },
    } as RadioInputEvent;

    onChange(event);
  };

  return (
    <Styles.CheckBoxWrapper>
      <Styles.CheckBox
        id={id}
        type="checkbox"
        onClick={handleClick}
        onKeyDown={handleClick}
        active={state}
        {...rest}
      />
      <Styles.CheckBoxLabel htmlFor={id} />
    </Styles.CheckBoxWrapper>
  );
};
