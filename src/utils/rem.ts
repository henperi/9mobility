const remUnit = 16;
export const rem = (pixelInteger: number) => {
  return `${pixelInteger / remUnit}rem`;
};
