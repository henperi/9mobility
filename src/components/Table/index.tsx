import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { generateShortId } from '../../utils/generateShortId';

export const TableExample: React.FC<{
  columns?: string[];
  data?: (string | number | Date)[][];
}> = (props) => {
  const { columns, data } = props;
  return (
    <Table>
      <Thead>
        <Tr>
          {columns?.map((name) => (
            <Th style={{ textAlign: 'left' }} key={generateShortId()}>
              {name}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((row) => (
          <Tr key={generateShortId()}>
            {row.map((item) => (
              <Td key={generateShortId()}>{item}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
