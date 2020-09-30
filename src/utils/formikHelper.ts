export const getFieldError = (error?: string, touched?: boolean) => {
  return touched && error ? error : '';
};

export const getAge = (dateString: string | undefined | null) => {
  if (dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  }
  return 0;
};

export const isFutureDate = (idate: any) => {
  const today = new Date().getTime();
  const converted = new Date(idate).getTime();

  return today - converted < 0;
};
