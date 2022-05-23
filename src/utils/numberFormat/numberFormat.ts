const { format } = new Intl.NumberFormat();

export const numberFormat = (number: number) => {
  return format(number);
};
