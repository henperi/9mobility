import React, { HtmlHTMLAttributes, useState, useLayoutEffect } from 'react';
import { logger } from '../../utils/logger';

interface IAvatar extends HtmlHTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  network?: boolean;
}
export const AsyncImage: React.FC<IAvatar> = ({
  src,
  alt,
  network = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState('');

  const loadImage = async (imageName: string | undefined) => {
    try {
      const image = await import(`../../assets/${imageName}`);

      setImageSrc(image?.default);
    } catch (error) {
      logger.log(error);
    }
  };

  useLayoutEffect(() => {
    if (!network && src) {
      loadImage(src);
    }
  }, [network, src]);

  return <img {...props} src={imageSrc} alt={alt} />;
};
