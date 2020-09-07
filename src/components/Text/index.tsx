import React from 'react';
import { Styles } from './styles';
import '@gouch/to-title-case';
import { sentenceCase } from '../../utils/sentenceCase';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  variant?: 'darker' | 'lighter' | 'white' | undefined;
  color?: string;
  alignment?: 'left' | 'right' | 'center' | 'justify';
  casing?:
    | 'capitalize'
    | 'lowercase'
    | 'uppercase'
    | 'titleCase'
    | 'sentenceCase';
}

const getChildren = (
  children: string | React.ReactNode,
  casing: TextProps['casing'],
) => {
  if (casing === 'titleCase' && typeof children === 'string') {
    // @ts-ignore
    return children.toTitleCase();
  }
  if (casing === 'sentenceCase' && typeof children === 'string') {
    return sentenceCase(children);
  }
  return children;
};

export const Text: React.FC<
  TextProps & { children: string | React.ReactNode }
> = (props) => {
  const { children, ...rest } = props;

  return (
    <Styles.Text {...rest}>{getChildren(children, props.casing)}</Styles.Text>
  );
};
