import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';

interface IAvatar extends HtmlHTMLAttributes<HTMLDivElement> {
  image?: string;
  name?: string;
}
export const Avatar: React.FC<IAvatar> = ({ image, name, ...props }) => {
  return (
    <Styles.Avatar {...props}>
      <img src={image} alt={name} />
    </Styles.Avatar>
  );
};
