import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';

interface IAvatar extends HtmlHTMLAttributes<HTMLDivElement> {
  image?: string;
  name?: string;
}
export const Avatar: React.FC<IAvatar> = (props) => {
  return (
    <Styles.Avatar {...props}>
      <img src={props.image} />
    </Styles.Avatar>
  );
};
