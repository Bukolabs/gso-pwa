export const numberFormat = (value: number, minimumFractionDigits = 0) => {
   const formatted = new Intl.NumberFormat('en-us', {
      minimumFractionDigits,
   }).format(value);
   return formatted;
};
