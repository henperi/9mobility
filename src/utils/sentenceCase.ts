export const sentenceCase = (text: string) => {
  const newString = text
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });

  return newString;
};
