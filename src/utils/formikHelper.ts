export const getFieldError = (error?: string, touched?: boolean) => {
  return touched && error ? error : '';
};
