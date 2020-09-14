import React from 'react';
import { Styles, TextProps } from './styles';
import '@gouch/to-title-case';
import { sentenceCase } from '../../utils/sentenceCase';

const getChildren = (
  children: string | React.ReactNode,
  casing: TextProps['casing'],
) => {
  if (casing === 'titleCase' && typeof children === 'string') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
  const { children, casing, ...rest } = props;

  return <Styles.Text {...rest}>{getChildren(children, casing)}</Styles.Text>;
};
