import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { generateShortId } from '../../utils/generateShortId';
import { Text } from '../Text';
import { Style } from './styles';

interface ISimpleTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  columns?: string[];
  data?: (string | number | Date)[][];
}

export const SimpleTable: React.FC<ISimpleTableProps> = (props) => {
  const { columns, data, ...rest } = props;

  return (
    <Style.Table {...rest}>
      <Thead>
        <Tr>
          {columns?.map((name) => (
            <Th key={generateShortId()}>
              <Text size={12} variant="lighter" weight={100}>
                {name}
              </Text>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((row) => (
          <Tr key={generateShortId()}>
            {row.map((item) => (
              <Td key={generateShortId()}>
                <Text variant="lighter">{item}</Text>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Style.Table>
  );
};
