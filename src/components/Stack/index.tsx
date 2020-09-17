import React from 'react';
import { Styles, IStackProps } from './style';

export const Stack: React.FC<IStackProps> = (props) => {
  const { children } = props;

  return (
    <Styles.Stack>
      <Styles.StackChild>{children}</Styles.StackChild>
    </Styles.Stack>
  );
};

Stack.propTypes = {};
