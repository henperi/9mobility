import React from 'react';
import { useHistory } from 'react-router-dom';
import { Styles } from './styles';
import { Row } from '../Row';
import { Text } from '../Text';

interface IBackButton {
  text?: React.ReactNode;
}
export const BackButton: React.FC<IBackButton> = ({ children }) => {
  const history = useHistory();

  return (
    <Row alignItems="center">
      <Styles.Arrow onClick={() => history.goBack()} />
      {children || <Text weight={500}>Back</Text>}
    </Row>
  );
};
