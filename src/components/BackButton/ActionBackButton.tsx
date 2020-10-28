import React from 'react';
import { useHistory } from 'react-router-dom';
import { Styles } from './styles';
import { Row } from '../Row';
import { Text } from '../Text';

interface IBackButton {
  text?: React.ReactNode;
  buttonAction?: any;
}
export const ActionBackButton: React.FC<IBackButton> = ({ children, buttonAction }) => {
  const history = useHistory();

  return (
    <Row alignItems="center"> 
      <Styles.Arrow onClick={() => buttonAction ?  buttonAction(): null} />
      {children || <Text weight={500}>Back</Text>}
    </Row>
  );
};
