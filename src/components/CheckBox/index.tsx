import React, { useState } from 'react';
import { Styles } from './styles';

export const Checkbox: React.FC<{
  checked?: boolean;
  onClick?: Function;
}> = (props) => {
  const { children, checked = false, onClick = () => null, ...rest } = props;
  const [state, setState] = useState(checked);
  const handleClick = () => {
    setState(!state);
    onClick(!state);
  };

  return (
    <label
      onClick={handleClick}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
      <Styles.Checkbox {...rest}>
        {state && <div className="checked" />}
      </Styles.Checkbox>
      {children}
    </label>
  );
};
